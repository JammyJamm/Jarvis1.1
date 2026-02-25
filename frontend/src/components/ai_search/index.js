import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";

import Divider from "@mui/material/Divider";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate } from "react-router-dom";
import { PromptContext } from "../../PromptContext";
import Container from "@mui/material/Container";
import URLSearch from "../../pages/ai_search/urlSearch";
import Box from "@mui/material/Box";
import Drag from "../../icons/minus.svg";
import AI_SearchLayout from "../../pages/ai_search";
const AI_Search = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { prompt, setPrompt, promptResp, setPromptResp } =
    useContext(PromptContext);

  const send = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setPromptResp("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { prompt });
      const jsonObjects = res.data.response.match(/\{[^}]*\}/g);
      const finalArray = jsonObjects.map((obj) => JSON.parse(obj));
      const combined = finalArray.map((item) => item.response).join("");

      setPromptResp(combined);
    } catch (err) {
      setPromptResp("Error: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };
  // Draging Code Starts
  const [width, setWidth] = useState(500);
  const navRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current || !navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();
    const newWidth = e.clientX - rect.left; // FIXED calculation

    if (newWidth > 300 && newWidth < 1200) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Draging Code Ends
  return (
    <div style={{ height: "100%" }}>
      <Paper
        component="form"
        position="static"
        sx={{
          width: width,
          height: "100%",
          position: "relative",
          transition: "all 0.1s ease-out",
          p: "6px 16px",
          display: "flex",
          alignItems: "end",
          borderRadius: "0px",
          boxSizing: "border-box",
        }}
        onMouseDown={handleMouseMove}
      >
        <div
          style={{
            position: "absolute",
            left: "-15px",
            width: "24px",
            height: "30px",
            borderRadius: "3px",
            background: "#fff",
            border: "1px solid rgb(229, 231, 235)",
            display: "flex",
          }}
        >
          <img
            src={Drag}
            style={{
              transform: "rotate(90deg)",
              opacity: "0.5",
              width: "20px",
              pointerEvents: "none",
            }}
            alt="drag"
          />

          <img
            src={Drag}
            style={{
              transform: "rotate(90deg)",
              position: "relative",
              left: "-15px",
              opacity: "0.5",
              width: "20px",
              pointerEvents: "none",
            }}
            alt="drag"
          />
        </div>
        <Box style={{ position: "relative", width: "100%" }}>
          <AI_SearchLayout />
          <Box style={{ position: "relative", width: "100%" }}>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                width: "100%",
                border: "1px solid #0d0d0d0d",
                padding: "8px 16px",
                margin: "0px",
                borderRadius: "50px",
                backgroundColor: "#edf0f7",
              }}
              value={prompt}
              onClick={() => navigate("./ai")}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="wanna ask ..."
            />
            {/* <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button> */}
            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={send}
              disabled={loading}
              style={{
                padding: "8px 16px",
                position: "absolute",
                top: "2px",
                right: "20px",
              }}
            >
              <AutoAwesomeIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
export default AI_Search;
