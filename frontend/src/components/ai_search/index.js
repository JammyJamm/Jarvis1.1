import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate } from "react-router-dom";
import { PromptContext } from "../../PromptContext";
import Container from "@mui/material/Container";
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

  return (
    // <Card sx={{ width: "100%" }}>
    //   <CardContent>
    //     <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
    //       {/* <textarea
    //     value={prompt}
    //     onChange={(e) => setPrompt(e.target.value)}
    //     placeholder="Ask something..."
    //     style={{ width: "100%", height: 120, padding: 12, fontSize: 16 }}
    //   /> */}
    //       <TextField
    //         fullWidth
    //         id="fullWidth"
    //         value={prompt}
    //         onChange={(e) => setPrompt(e.target.value)}
    //         placeholder="wanna ask ..."
    //         style={{ width: "100%", height: 120, padding: 12, fontSize: 16 }}
    //       />
    //       <div style={{ marginTop: 12 }}>
    //         <button
    //           onClick={send}
    //           disabled={loading}
    //           style={{ padding: "8px 16px" }}
    //         >
    //           {loading ? "Thinking..." : "Send"}
    //         </button>
    //       </div>

    //       <div style={{ marginTop: 20 }}>
    //         <h3>Response</h3>
    //         <pre
    //           style={{
    //             whiteSpace: "pre-wrap",
    //             background: "#f6f6f6",
    //             padding: 12,
    //           }}
    //         >
    //           {response}
    //         </pre>
    //       </div>
    //     </Typography>
    //   </CardContent>
    // </Card>
    <Paper
      component="form"
      sx={{
        p: "6px 16px",
        display: "flex",
        alignItems: "center",
        borderRadius: "0px",
      }}
    >
      <Container style={{ position: "relative" }}>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
            border: "1px solid #0d0d0d0d",
            padding: "8px 16px",
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
      </Container>
    </Paper>
  );
};
export default AI_Search;
