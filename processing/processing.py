from __future__ import annotations

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
import json
import os


import os
from pathlib import Path
from typing import Iterable, Set

# Load environment variables from .env file
load_dotenv()

# Initialize client with API key from env
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class Participant(BaseModel):
    name: str
    place: int
    team: str

class Division(BaseModel):
    division_name: str
    participant: list[Participant]

class JSONEvent(BaseModel):
    title: str
    year: str
    divisions: list[Division]
    state: str


def extract_events_from_file(file_path: str,
                             output_json_path: str = "events.json") -> None:
    """
    Upload a file to GPT-5, extract structured event data, and append it
    to a local JSON list.

    :param file_path: Path to the input file (PDF, docx, etc.).
    :param output_json_path: Path to the output JSON file.
    """
    # Upload file
    uploaded_file = client.files.create(
        file=open(file_path, "rb"),
        purpose="user_data"
    )

    # Ask GPT-5 to parse contents into structured JSONEvent
    response = client.responses.parse(
        model="gpt-5",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_file",
                        "file_id": uploaded_file.id,
                    },
                    {
                        "type": "input_text",
                        "text": f"Extract the event data found in {file_path} and return it in the specified. The participant teams are often not listed, in which case leave each team field as the empty string. The state field is for an Australian state or territory where the event took place. If there is none apparent, please pass the empty string in that field.",
                    },
                ],
            }
        ],
        text_format=JSONEvent,
    )

    event = response.output_parsed

    # Ensure we have a list for appending
    if isinstance(event, JSONEvent):
        event_dict = event.model_dump()
    elif isinstance(event, list):
        event_dict = [e.model_dump() for e in event]
    else:
        raise ValueError("Unexpected response format from GPT-5.")

    # Load existing JSON data if file exists
    if os.path.exists(output_json_path):
        with open(output_json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    # Append new events
    if isinstance(event_dict, list):
        data.extend(event_dict)
    else:
        data.append(event_dict)

    # Write back to file
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Appended {len(event_dict) if isinstance(event_dict, list) else 1} "
          f"event(s) to {output_json_path}")





def load_completed(path: Path) -> Set[str]:
    if not path.exists():
        return set()
    with path.open("r", encoding="utf-8") as f:
        return {line.strip() for line in f if line.strip()}


def mark_completed(path: Path, key: str) -> None:
    """
    Append a line to the completed list. fsync to avoid partial writes if the
    process crashes immediately after write (optional but nice).
    """
    with path.open("a", encoding="utf-8") as f:
        f.write(key + "\n")
        f.flush()
        os.fsync(f.fileno())


def list_files(root: Path, extensions: Iterable[str]) -> list[Path]:
    exts = {e.lower() for e in extensions}
    return sorted(
        p for p in root.iterdir()
        if p.is_file() and p.suffix.lower() in exts
    )


def process_directory_simple(
    files_dir: str | Path,
    output_json_path: str | Path = "events.json",
    completed_path: str | Path = ".completed.txt",
    extensions: tuple[str, ...] = (".pdf",),
) -> None:
    """
    Run extract_events_from_file(...) on each file once.
    - Stops on the first error (re-raises).
    - Skips files already recorded in `completed_path`.
    """
    files_dir = Path(files_dir)
    completed_path = Path(completed_path)

    done = load_completed(completed_path)

    for file_path in list_files(files_dir, extensions):
        # Use path relative to the directory as the stable key
        rel_key = str(file_path.relative_to(files_dir))

        if rel_key in done:
            print(f"Skip: {rel_key}")
            continue

        print(f"Processing: {rel_key}")
        try:
            extract_events_from_file(str(file_path), str(output_json_path))
        except Exception:
            # Do not mark as completed; propagate error to stop the run
            raise
        else:
            # Mark completed only on success
            mark_completed(completed_path, rel_key)


if __name__ == "__main__":
    process_directory_simple(
        files_dir="files",
        output_json_path="events.json",
        completed_path=".completed.txt",
        extensions=(".pdf",),
    )

