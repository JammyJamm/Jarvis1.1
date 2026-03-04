from fastapi import APIRouter
from pydantic import BaseModel
from playwright.sync_api import sync_playwright
from ai_parser import parse_command_to_selector

router = APIRouter()

class CommandRequest(BaseModel):
    url: str
    prompt: str

print("Server router loaded...")

@router.post("/execute")
def execute_command(req: CommandRequest):
    selector, action_text = parse_command_to_selector(req.prompt)

    script = ""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(req.url)

        if selector:
            script = f"document.querySelector('{selector}').click()"
            page.evaluate(script)

        browser.close()

    return {
        "action": action_text,
        "script": script
    }