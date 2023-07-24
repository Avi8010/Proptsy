import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import bImg from "../images/navpic8.jpg";
import icon from "../images/icon.png";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { MenuOpen, MenuRounded } from "@mui/icons-material";

const pages = ["Buy", "Sell", "Rent"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundImage: `url(${bImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "100%",
    height: "auto",
    filter: "brightness(0.9)"
  },
}));

const styles = {
  customizeToolbar: {
    minHeight: 72,
  },
};

function MyAppBar({ isBg }) {
  const navigate = useNavigate();

  const classes1 = useStyles();
  // useEffect(async () => {
  // const token = localStorage.getItem("accessToken");
  // try {
  //   if (token === "null") throw "null";
  //   const resp = await axios.get("/property", {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // } catch (err) {
  //   console.log("in error");
  //   localStorage.setItem("accessToken", null);
  //   requestAccessToken().then((msg) => {
  //     console.log("req access token resp", msg);
  //     if (!msg) navigate("/login");
  //   });
  // }
  // });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.value);
    setAnchorElNav(null);
    // navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    localStorage.setItem("accessToken", null)
    localStorage.setItem("refreshToken", null)
    localStorage.setItem("userName", null);
  }

  const showProfile = () => {
    navigate("/profile");
  }

  function handleMenuClickEvent(menuChoice) {
    if (menuChoice === "Logout") {
      logoutUser()
      navigate("/buy");
      alert("User Logged Out.");

    }
    else if (menuChoice === "Profile") showProfile()
  }
  // const token = localStorage.getItem("accessToken");
  // if(token === null) {
  //   navigate("/login")
  // }

  return (
    <div
      className={isBg ? classes1.header : ""}
      style={{ height: isBg ? "50vw" : "0" }}
    >
      <AppBar
        position="sticky"
        style={{
          boxShadow: "none",
          color: "black",
          backgroundColor: "black",
          opacity: "70%",
        }}
      >
        <Container maxWidth="lg" >
          <Toolbar disableGutters>
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              style={{ alignSelf: "start", color: "black" }}
            >
              <IconButton
                size="medium"
                aria-label="button"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {/* <MenuBook /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textalign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img
              src={icon}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
              style={{
                cursor: "pointer",
                width: "150px",
                height: "60px",
                marginRight: "8rem",
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  // onChange={(e) => handleCloseNavMenu(e.target.value)}
                  onClick={() => {
                    navigate(
                      "/" +
                      (page.toLowerCase() === "buy" ? "" : page.toLowerCase())
                    );
                  }}
                  // onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "medium",
                    fontSize: "18px",
                    marginRight: "1px",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Suraj" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography
                      value={setting}
                      onClick={() => handleMenuClickEvent(setting)}
                      textalign="center"
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default MyAppBar;
