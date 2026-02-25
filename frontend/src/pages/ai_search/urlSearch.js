import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";

const URLSearch = () => {
  const [url, setUrl] = useState("");
  console.log(url);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
      className="bdr_btm"
    >
      <div style={{ position: "relative" }}>
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
          onChange={(e) => setUrl(e.target.value)}
          placeholder="wanna ask ..."
        />

        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          //   onClick={send}
          //   disabled={loading}
          style={{
            padding: "8px 16px",
            position: "absolute",
            top: "2px",
            right: "20px",
          }}
        ></IconButton>
      </div>
    </Box>
  );
};
export default URLSearch;
