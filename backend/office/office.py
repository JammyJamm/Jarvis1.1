
from fastapi import FastAPI
from playwright.async_api import async_playwright
import asyncio

app = FastAPI()
exteranlURL = "https://zingnext.zinghr.com/portal/tna"
@app.post("/run-browser")
async def run_browser():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # set True for hidden browser
        page = await browser.new_page()
        
        await page.goto(exteranlURL)
        await page.click("button#myButton")
        text = await page.inner_text("body")
        await browser.close()
        return {"status": "clicked", "content": text,"externalURL":exteranlURL}
