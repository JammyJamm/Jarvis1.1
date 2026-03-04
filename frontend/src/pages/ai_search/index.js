import { useState } from "react";
import axios from "axios";

const AI_SearchLayout = () => {
  const [url, setUrl] = useState("https://example.com");
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([]);

  const runAICommand = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/execute", {
        url,
        prompt: command,
      });

      setLogs((prev) => [...prev, "AI: " + res.data.action]);

      // Execute JS if running in Tauri
      if (window.__TAURI__ && window.__TAURI__.invoke) {
        await window.__TAURI__.invoke("execute_js", {
          script: res.data.script,
        });
      } else {
        if (res.data.script) eval(res.data.script); // For browser dev mode
      }
    } catch (err) {
      console.error(err);
      setLogs((prev) => [...prev, "Error: " + err.message]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "300px",
          padding: "10px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h3>AI Command</h3>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: "100%" }}
        />
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command like 'click login button'"
          style={{ width: "100%", marginTop: "10px" }}
        />
        <button onClick={runAICommand} style={{ marginTop: "5px" }}>
          Run AI
        </button>

        <h4>Debug Console</h4>
        <div style={{ fontSize: "12px", maxHeight: "200px", overflow: "auto" }}>
          {logs.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
      <iframe
        id="browser-frame"
        src={url}
        style={{ flex: 1, border: "none" }}
        title="Website B"
      />
    </div>
  );
};

export default AI_SearchLayout;
