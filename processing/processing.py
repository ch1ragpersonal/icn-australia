

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
import json
import os

# Load environment variables from .env file
load_dotenv()

# Initialize client with API key from env
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class Participant(BaseModel):
    place: int
    team: str

class Division(BaseModel):
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
                        "text": f"Extract the event data found in {file_path} and return it in the specified .",
                    },
                ],
            }
        ],
        text_format=JSONEvent,
    )

    # Parsed response object (may be a single event or a list, depending on file)
    event = response.output_parsed

    # Ensure we have a list for appending
    if isinstance(event, JSONEvent):
        event_dict = event.dict()
    elif isinstance(event, list):
        event_dict = [e.dict() for e in event]
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


extract_events_from_file("files/2022afcandxmenresults.pdf", "events.json")
