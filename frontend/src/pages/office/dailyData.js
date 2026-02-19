import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

const DailyData = () => {
  return (
    <Card
      sx={{
        width: "400px",
        height: "100%",
        borderRadius: "0px",
        display: "flex",
        alignItems: "left",
        flexDirection: "column",
        padding: "16px 26px",
      }}
      className="dailyData"
    >
      <Typography variant="h5" component="h6" textAlign="left">
        Daily Data
      </Typography>
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        justifyContent="space-between"
        width="100%"
        padding="10px 16px"
        sx={{ backgroundColor: "#edf0f7" }}
      >
        <Card
          sx={{
            width: "400px",
            height: "100%",
            borderRadius: "0px",
            display: "flex",
            alignItems: "center",
          }}
          className="dailyData"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
            width="100%"
            padding="10px 16px"
          >
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography variant="h6" component="h6">
                09
              </Typography>
              <Chip
                label="Tue"
                sx={{ fontSize: "12px", padding: "2px 10px" }}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              direction="column"
              alignItems="center"
              spacing={1}
              width="100%"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                width="100%"
                justifyContent="space-between"
                padding="0px 16px"
              >
                <Typography gutterBottom variant="body2">
                  10:00 am
                </Typography>
                <Typography gutterBottom variant="body2">
                  04:00 pm
                </Typography>
              </Stack>
              <Stack width="100%">
                <Divider>
                  <Chip label="sucess" size="small" />
                </Divider>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
};
export default DailyData;
