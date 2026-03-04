from ast import Return
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
from firebase_admin import credentials, firestore, initialize_app
from apscheduler.schedulers.background import BackgroundScheduler
import datetime
import office.office as office

app = FastAPI()

# origins = [
#     "http://localhost:3005",
#     "http://localhost:5173"
# ]
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#---------------------- Push firebase store ---------------------- #
cred = credentials.Certificate("credentials.json")
initialize_app(cred)
db = firestore.client()
#---------------------- Onload call ---------------------- #
@app.get("/zing-summary")
def zing_summary():
    output = office.summarize_zing()
    return {"summary": output}

#---------------------- Ai Model ---------------------- #
OLLAMA_URL = "http://localhost:11434/api/generate"

class Prompt(BaseModel):
    prompt: str



@app.post("/chat")
def chat_with_llama3(data: Prompt):
    payload = {
        "model": "llama3",
        "prompt": data.prompt,
         "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)

    text = ""
    for line in response.iter_lines():
        if line:
            text += line.decode("utf-8")

    return {"response": text}

#---------------------- Get IP config geolocation ---------------------- #
@app.get("/location")
def get_location():
    data = get_location_data()  # fetch IP + geo
    today_date = datetime.datetime.now().strftime("%d-%m-%Y")
    if "error" in data:
        return {"status": "failed", "error": data["error"]}
    # Condtion check same date in firebase 
    if check_document_exists(today_date):
         db.collection("daily_data").document(today_date).set(data, merge=True)
    else:
        db.collection("daily_data").document(today_date).set(data)
    return {
        "status": "success",
        "saved": True,
        "data": data
    }
# Condtion check same date in firebase 
def check_document_exists(today_date):
    doc_ref = db.collection("daily_data").document(today_date)
    doc = doc_ref.get()
    return doc.exists

def get_location_data():
    try:
        public_ip = requests.get("https://api.ipify.org").text
        geo = requests.get(f"http://ip-api.com/json/{public_ip}").json()
        return {
           datetime.datetime.now().strftime("%H:%M:%S"):{
                "ip": public_ip,
                "location": geo
            }
         }

    except Exception as e:
        return {"error": str(e)}

scheduler = BackgroundScheduler()
scheduler.add_job(get_location, "interval", minutes=30)
scheduler.start()


#---------------------- Get IP config geolocation ---------------------- #
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIMessage(BaseModel):
    message: str

@app.post("/ai")
async def ai_chat(data: AIMessage):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": data.message}
            ]
        )

        return {
            "reply": response.choices[0].message.content
        }

    except Exception as e:
        return {"error": str(e)}

#---------------------- Get IP config geolocation ---------------------- #
from pydantic import BaseModel
from playwright.sync_api import sync_playwright
from ai_parser import parse_command_to_selector
class CommandRequest(BaseModel):
    url: str
    prompt: str

print("Server router loaded...")

@app.post("/execute")
def execute_command(req: CommandRequest):
    selector, action_text = parse_command_to_selector(req.prompt)

    script = ""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(req.url)

        if selector:
            try:
                page.wait_for_selector(selector, timeout=5000)
                page.click(selector)
                script = f"Clicked element: {selector}"
            except Exception as e:
                script = f"Error: {str(e)}"
        else:
            script = "No element found"

        browser.close()

    return {
        "action": action_text,
        "script": script
    }