import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import { ReactComponent as DashboardIcon } from "../../icons/airplay.svg";
import { ReactComponent as Money } from "../../icons/dollar-sign.svg";
import { ReactComponent as Office } from "../../icons/briefcase.svg";
import Logo from "../../assets/logo.png";
import "./style.css";
function Sidebar() {
  const location = useLocation();

  return (
    <Card
      sx={{
        minWidth: "19rem",
        height: "100%",
        borderRadius: "0px",
        // marginRight: "15px",
        borderRadius: "0px !important",
      }}
    >
      <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="logo" className="logo" />
        </ListItemIcon>
      </ListItemButton>

      <CardContent className="nav">
        <Link
          to="/"
          style={{ display: "flex", textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton selected={location.pathname === "/"}>
            <ListItemIcon className="icon">
              <DashboardIcon style={{ fill: "none" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="linkname" />
          </ListItemButton>
        </Link>

        <Link
          to="/money"
          style={{ display: "flex", textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton selected={location.pathname === "/money"}>
            <ListItemIcon className="icon">
              <Money />
            </ListItemIcon>
            <ListItemText primary="Money" />
          </ListItemButton>
        </Link>

        <Link
          to="/office"
          style={{ display: "flex", textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton selected={location.pathname === "/office"}>
            <ListItemIcon className="icon">
              <Office />
            </ListItemIcon>
            <ListItemText primary="Office" />
          </ListItemButton>
        </Link>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
}

export default Sidebar;
