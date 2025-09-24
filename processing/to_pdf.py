#!/usr/bin/env python3
"""
Batch convert .xlsx files to PDF via HTML using pandas and pdfkit.

Requirements:
- pandas
- pdfkit
- wkhtmltopdf installed and on PATH (pdfkit depends on it)

Usage:
    python xlsx_to_pdf.py /path/to/folder
    python xlsx_to_pdf.py /path/to/folder --recursive
    python xlsx_to_pdf.py /path/to/folder --out /path/to/output
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Optional

import pandas as pd
import pdfkit


def get_unique_path(path: Path) -> Path:
    """
    Return a unique Path by appending ' (n)' before the suffix if needed.
    Example: report.pdf -> report (1).pdf, report (2).pdf, ...
    """
    if not path.exists():
        return path

    stem = path.stem
    suffix = path.suffix
    parent = path.parent

    counter = 1
    while True:
        candidate = parent / f"{stem} ({counter}){suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def convert_xlsx_to_pdf(xlsx_path: Path, out_dir: Optional[Path] = None) -> None:
    """
    Convert a single .xlsx file to PDF via HTML.

    - Reads the first sheet of the workbook into a DataFrame.
    - Writes a temporary HTML file.
    - Renders to a uniquely named PDF (does not overwrite existing files).
    - Prints progress messages.
    """
    try:
        print(f"[INFO] Reading: {xlsx_path}")
        df = pd.read_excel(xlsx_path)  # first sheet by default

        # Build target PDF path (unique if exists)
        out_dir = out_dir or xlsx_path.parent
        out_dir.mkdir(parents=True, exist_ok=True)
        base_pdf = out_dir / f"{xlsx_path.stem}.pdf"
        pdf_path = get_unique_path(base_pdf)

        # Write HTML to a temporary file
        with NamedTemporaryFile(mode="w", suffix=".html", delete=False) as tmp_html:
            html_path = Path(tmp_html.name)
            tmp_html.write(df.to_html(index=False))

        print(f"[INFO] Converting to PDF: {pdf_path.name}")
        pdfkit.from_file(str(html_path), str(pdf_path))
        print(f"[OK]   Wrote: {pdf_path}")

        # Clean up the temporary HTML
        try:
            html_path.unlink(missing_ok=True)
        except Exception as cleanup_err:
            print(f"[WARN] Could not remove temp HTML '{html_path}': {cleanup_err}")

    except Exception as exc:
        print(f"[ERROR] Failed on '{xlsx_path}': {exc}")


def find_xlsx_files(root: Path, recursive: bool) -> list[Path]:
    """
    Find .xlsx files in the given directory (recursively if requested).
    """
    pattern = "**/*.xlsx" if recursive else "*.xlsx"
    return sorted(root.glob(pattern))


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Batch convert .xlsx files to PDF via HTML using pandas + pdfkit."
    )
    parser.add_argument(
        "folder",
        type=Path,
        help="Folder containing .xlsx files."
    )
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="Recurse into subfolders."
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Optional output folder (mirrors input filenames). Defaults to input file's folder."
    )

    args = parser.parse_args()

    if not args.folder.exists() or not args.folder.is_dir():
        print(f"[ERROR] Folder does not exist or is not a directory: {args.folder}")
        return 1

    xlsx_files = find_xlsx_files(args.folder, args.recursive)

    if not xlsx_files:
        print("[INFO] No .xlsx files found.")
        return 0

    print(f"[INFO] Found {len(xlsx_files)} .xlsx file(s).")

    for xlsx_path in xlsx_files:
        convert_xlsx_to_pdf(xlsx_path, args.out)

    print("[DONE] All conversions attempted.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
