import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import "../App.css";
import "../index.css";
//MUI
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";

const NavBar = () => {
  const auth = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <CoffeeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Coffee Date
        </Typography>
        <header className={"header"}>
          <Stack direction="row" spacing={2}>
              <Button>
                <Link className="links" to={"/"}>Home</Link>
              </Button>
              {auth.user ? (
                <>
                  <Button>
                    <Link className="links" to={"/profile"}>Profile</Link>
                  </Button>
                  <Button>
                    <Link className="links" to={"/settings"}>Settings</Link>
                  </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={auth.logout}
                    >
                      Sign Out
                    </Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link className="links" to={"/sign-in"}>Sign In</Link>
                  </Button>
                  <Button>
                    <Link className="links" to={"/sign-up"}>Sign Up</Link>
                  </Button>
                </>
              )}
          </Stack>
        </header>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
