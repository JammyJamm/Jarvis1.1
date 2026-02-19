import { useContext } from "react";
import { PromptContext } from "../../PromptContext";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const AI_SearchLayout = () => {
  const { prompt, promptResp } = useContext(PromptContext);
  console.log(promptResp);
  return (
    <Container
      style={{ position: "relative", height: "100%", paddingBottom: "16px" }}
    >
      <Box
        sx={{ flexGrow: 1, height: "100%", display: "flex", alignItems: "end" }}
      >
        <Grid
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Grid
            size={{ xs: 6, md: 8 }}
            style={{ display: "flex", justifyContent: "end" }}
          >
            {prompt !== "" ? (
              <Chip label={prompt} className="chatPrompt" />
            ) : (
              "Typing..."
            )}
          </Grid>
          <Grid
            style={{ width: "100%", display: "flex", justifyContent: "start" }}
          >
            {prompt !== "" ? (
              <Chip label={promptResp} className="chatResp" />
            ) : (
              "Thinking..."
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default AI_SearchLayout;
