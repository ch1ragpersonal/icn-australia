"""
Sync competition results JSON -> Contentful (safer fuzzy matching)
- Looks up existing "Competition" entries by year + fuzzy title match
- If not found (or match below threshold), creates a new entry
- Writes `divisions` JSON into the `results` field
- Optionally links `state` if you have a separate State content type

JSON expected (list or {"competitions": [...]}) with keys:
  title: str
  year: int (recommended)
  state: str (optional; e.g., "NSW")
  divisions: dict (stored as JSON in Contentful "results" field)
"""
import json
import re
from datetime import datetime
import time
from typing import Any, Dict, List, Optional, Tuple

import requests
from rapidfuzz import fuzz
from dotenv import load_dotenv
import os

load_dotenv()

# ========= CONFIG =========
SPACE_ID = os.getenv("CONTENTFUL_SPACE_ID")
ENVIRONMENT_ID = "master"
CMA_TOKEN = os.getenv("CONTENTFUL_CMA_TOKEN")

CONTENT_TYPE_ID = "competition"          # Competition content type id
LOCALE = "en-US"

# Field IDs in your Competition model (adjust to your actual field ids)
FIELD_ID_NAME = "competitionName"        # "Competition Name" (Entry title)
FIELD_ID_DATE = "date"                   # Date & time field
FIELD_ID_STATE = "state"                 # Reference field (single link assumed)
FIELD_ID_RESULTS = "results"             # JSON object field

# If State is a referenced entry, set its content type id (else leave None to skip)
STATE_CONTENT_TYPE_ID = "state"          # set to your real State content type id or None
STATE_FIELD_IS_ARRAY = False             # set True if your State field is an array of links

# Matching behaviour (be conservative)
FUZZY_MIN_SCORE = 88                     # token_set_ratio threshold (0-100)
PREFER_SAME_YEAR = True                  # only accept cross-year matches if 100% exact
DRY_RUN = False                          # True prints actions without writing

# Optional: small delay to respect API rate limits if needed
WRITE_DELAY_SEC = 0.2

# ========= HTTP =========
BASE_URL = f"https://api.contentful.com/spaces/{SPACE_ID}/environments/{ENVIRONMENT_ID}"
BASE_HEADERS = {
    "Authorization": f"Bearer {CMA_TOKEN}",
    "Content-Type": "application/vnd.contentful.management.v1+json",
}

def _get(url: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
    r = requests.get(url, headers=BASE_HEADERS, params=params or {})
    r.raise_for_status()
    return r.json()

def _post(url: str, json_body: Dict[str, Any], headers_extra: Dict[str, str] = None) -> Dict[str, Any]:
    headers = {**BASE_HEADERS, **(headers_extra or {})}
    if DRY_RUN:
        print("[DRY-RUN] POST", url, json_body)
        return {"sys": {"id": "dry_run", "version": 1}}
    r = requests.post(url, headers=headers, json=json_body)
    r.raise_for_status()
    return r.json()

def _put(url: str, json_body: Dict[str, Any] = None, headers_extra: Dict[str, str] = None) -> Dict[str, Any]:
    headers = {**BASE_HEADERS, **(headers_extra or {})}
    if DRY_RUN:
        print("[DRY-RUN] PUT", url, json_body)
        return {"sys": {"id": "dry_run", "version": headers.get("X-Contentful-Version", 1)}}
    r = requests.put(url, headers=headers, json=json_body)
    r.raise_for_status()
    return r.json()

# ========= Utilities =========
def jan1_iso(year: int) -> str:
    # Accept int or numeric string and normalise
    y = int(year)
    return f"{y:04d}-01-01T00:00:00Z"

def end_of_year_iso(year: int) -> str:
    # Accept int or numeric string and normalise
    y = int(year)
    return f"{y:04d}-12-31T23:59:59Z"

def extract_year_from_title(title: str) -> Optional[int]:
    m = re.search(r"(20\d{2})", title)
    return int(m.group(1)) if m else None

def norm(s: str) -> str:
    # Conservative normaliser: lower + collapse whitespace
    return re.sub(r"\s+", " ", re.sub(r"[^\w\s\-&/]", " ", s.lower())).strip()

def title_score(a: str, b: str) -> int:
    # token_set_ratio is robust to token order/duplication
    return fuzz.token_set_ratio(norm(a), norm(b))

def get_field_value(entry: Dict[str, Any], field_id: str, locale: str = LOCALE) -> Optional[Any]:
    try:
        return entry["fields"][field_id][locale]
    except KeyError:
        return None

def year_of_entry(entry: Dict[str, Any]) -> Optional[int]:
    iso = get_field_value(entry, FIELD_ID_DATE)
    if not iso:
        return None
    try:
        return datetime.fromisoformat(iso.replace("Z", "+00:00")).year
    except Exception:
        return None

# ========= Lookups =========
def list_competitions_for_year(year: Optional[int]) -> List[Dict[str, Any]]:
    params = {"content_type": CONTENT_TYPE_ID, "limit": 1000}
    if year:
        params[f"fields.{FIELD_ID_DATE}[gte]"] = jan1_iso(year)
        params[f"fields.{FIELD_ID_DATE}[lte]"] = end_of_year_iso(year)
    data = _get(f"{BASE_URL}/entries", params=params)
    return data.get("items", [])

def find_best_match(title: str, candidates: List[Dict[str, Any]]) -> Optional[Tuple[Dict[str, Any], int]]:
    best = None
    best_score = -1
    for e in candidates:
        name = get_field_value(e, FIELD_ID_NAME) or ""
        score = title_score(title, name)
        if score > best_score:
            best, best_score = e, score
    if best is None:
        return None
    return (best, best_score)

def find_existing_competition(title: str, year: Optional[int]) -> Optional[Dict[str, Any]]:
    # 1) Try within the same year (preferred)
    if year is not None:
        same_year = list_competitions_for_year(year)
        m = find_best_match(title, same_year)
        if m:
            entry, score = m
            if score >= FUZZY_MIN_SCORE:
                return entry
            # If near-exact match (case-insensitive exact), allow
            name = get_field_value(entry, FIELD_ID_NAME) or ""
            if norm(title) == norm(name):
                return entry

    # 2) If not found or year missing, do a narrow global search by partial match to reduce set
    params = {
        "content_type": CONTENT_TYPE_ID,
        f"fields.{FIELD_ID_NAME}[match]": title,
        "limit": 100,
    }
    rough = _get(f"{BASE_URL}/entries", params=params).get("items", [])
    if not rough:
        return None

    # Prefer same-year candidates if possible
    if PREFER_SAME_YEAR and year is not None:
        same_year = [e for e in rough if year_of_entry(e) == year]
        pool = same_year or rough
    else:
        pool = rough

    m = find_best_match(title, pool)
    if not m:
        return None
    entry, score = m

    # Guard against cross-year collisions like "Regional Titles 2023" vs "2024"
    if year is not None and PREFER_SAME_YEAR and year_of_entry(entry) != year:
        # only accept if titles are effectively identical
        if norm(get_field_value(entry, FIELD_ID_NAME) or "") == norm(title):
            return entry
        return None

    if score >= FUZZY_MIN_SCORE or norm(get_field_value(entry, FIELD_ID_NAME) or "") == norm(title):
        return entry
    return None

# ========= State linking (optional) =========
_state_cache: Dict[str, Optional[str]] = {}

def find_state_entry_id(state_text: str) -> Optional[str]:
    if not STATE_CONTENT_TYPE_ID or not state_text:
        return None
    key = state_text.strip().lower()
    if key in _state_cache:
        return _state_cache[key]
    params = {
        "content_type": STATE_CONTENT_TYPE_ID,
        "query": state_text,
        "limit": 5,
    }
    items = _get(f"{BASE_URL}/entries", params=params).get("items", [])
    # Pick the first with highest token match on title/name-like fields
    best_id, best_score = None, -1
    for e in items:
        # Try a few common field ids that might hold the state label
        for fid in ("title", "name", "stateName", "code", "abbr"):
            val = get_field_value(e, fid)
            if not isinstance(val, str):
                continue
            score = title_score(state_text, val)
            if score > best_score:
                best_id, best_score = e["sys"]["id"], score
    _state_cache[key] = best_id
    return best_id

def state_link(state_text: Optional[str]) -> Optional[Any]:
    if not state_text:
        return None
    sid = find_state_entry_id(state_text)
    if not sid:
        return None
    link = {"sys": {"type": "Link", "linkType": "Entry", "id": sid}}
    return [link] if STATE_FIELD_IS_ARRAY else link

# ========= Write helpers =========
def publish_entry(entry_id: str, version: int) -> Dict[str, Any]:
    return _put(
        f"{BASE_URL}/entries/{entry_id}/published",
        headers_extra={"X-Contentful-Version": str(version)},
    )

def update_entry(entry_id: str, fields: Dict[str, Any], current_version: int) -> Dict[str, Any]:
    updated = _put(
        f"{BASE_URL}/entries/{entry_id}",
        json_body={"fields": fields},
        headers_extra={"X-Contentful-Version": str(current_version)},
    )
    return updated

def create_entry(fields: Dict[str, Any]) -> Dict[str, Any]:
    created = _post(
        f"{BASE_URL}/entries",
        json_body={"fields": fields},
        headers_extra={"X-Contentful-Content-Type": CONTENT_TYPE_ID},
    )
    return created

# ========= Main sync =========
def build_fields_for_create(title: str, year: Optional[int], state_txt: Optional[str], divisions: Dict[str, Any]) -> Dict[str, Any]:
    fields = {
        FIELD_ID_NAME: {LOCALE: title},
        FIELD_ID_RESULTS: {LOCALE: divisions},
    }
    if year:
        fields[FIELD_ID_DATE] = {LOCALE: jan1_iso(year)}
    if state_txt:
        link = state_link(state_txt)
        if link:
            fields[FIELD_ID_STATE] = {LOCALE: link}
    return fields

def build_fields_for_update(existing: Dict[str, Any], divisions: Dict[str, Any]) -> Dict[str, Any]:
    # Only update results (per your instructions); keep other fields as-is
    fields = existing.get("fields", {}).copy()
    fields.setdefault(FIELD_ID_RESULTS, {})
    fields[FIELD_ID_RESULTS][LOCALE] = divisions
    return fields

def sync_competition(obj: Dict[str, Any]) -> None:
    title = obj.get("title", "").strip()
    if not title:
        print("Skipping item with no title:", obj)
        return

    year = obj.get("year")
    if not year:
        year = extract_year_from_title(title)

    divisions = obj.get("divisions", {})
    state_txt = obj.get("state")

    existing = find_existing_competition(title, year)

    if existing:
        entry_id = existing["sys"]["id"]
        version = existing["sys"]["version"]
        new_fields = build_fields_for_update(existing, divisions)
        updated = update_entry(entry_id, new_fields, version)
        # After update, publish using the new version from response
        publish_entry(entry_id, updated["sys"]["version"])
        print(f"Updated + published: {title} (#{entry_id})")
    else:
        new_fields = build_fields_for_create(title, year, state_txt, divisions)
        created = create_entry(new_fields)
        publish_entry(created["sys"]["id"], created["sys"]["version"])
        print(f"Created + published: {title} (#{created['sys']['id']})")

    if WRITE_DELAY_SEC:
        time.sleep(WRITE_DELAY_SEC)

def load_input(filename: str) -> List[Dict[str, Any]]:
    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and "competitions" in data:
        return data["competitions"]
    if isinstance(data, list):
        return data
    raise ValueError("Input JSON must be a list of competitions or {'competitions': [...]}")

if __name__ == "__main__":
    INPUT_JSON = "events3.json"  # change to your file path
    items = load_input(INPUT_JSON)
    print(f"Found {len(items)} competitions in input.")
    for obj in items:
        sync_competition(obj)
