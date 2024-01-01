import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToSignup = () => {
    navigate("/signup");
  };

  const navigateToQuotes = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="justify-end">
          <Button color="inherit" onClick={navigateToQuotes}>
            Quotes
          </Button>
          {token ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("./create");
                }}
              >
                Create Quote
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("./profile");
                }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("./login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={navigateToLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={navigateToSignup}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
