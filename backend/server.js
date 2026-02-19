const express = require("express");
const { WebSocketServer } = require("ws");
const { chromium } = require("playwright");

const app = express();
const PORT = 5000;

const wss = new WebSocketServer({ port: 5001 }); // WebSocket server

wss.on("connection", async (ws) => {
  console.log("Frontend connected");

  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Go to website
  await page.goto("https://login.zinghr.com/");

  // Capture frames continuously
  const captureLoop = setInterval(async () => {
    try {
      const buffer = await page.screenshot({ type: "jpeg", quality: 50 });
      ws.send(buffer.toString("base64"));
    } catch (err) {
      console.error(err);
    }
  }, 500); // every 500ms

  // Handle incoming messages from frontend
  ws.on("message", async (msg) => {
    const data = JSON.parse(msg);
    if (data.type === "click") {
      const { x, y } = data;
      await page.mouse.click(x, y);
    } else if (data.type === "type") {
      const { selector, text } = data;
      await page.fill(selector, text);
    }
  });

  ws.on("close", async () => {
    clearInterval(captureLoop);
    await browser.close();
    console.log("Browser closed");
  });
});

app.listen(PORT, () => {
  console.log(`HTTP server running on ${PORT}`);
});
