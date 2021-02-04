import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [{ isLogin }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("login from navbar");
  }, [isLogin]);

  const handeleLogOut = (e) => {
    e.preventDefault();
    dispatch({
      type: "IS_USER_LOGIN",
      isLogin: false,
    });
    localStorage.clear();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {isLogin ? (
            <Button onClick={handeleLogOut}>Log Out</Button>
          ) : (
            <Link to="/login">
              <Button color="inherit">Log In</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
