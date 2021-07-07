import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      transform: 'rotate(-90deg)'
    }
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <img className={classes.root} width="45px" src="/pokeball-logo.png" />
        </IconButton>
        <Typography
          style={{ marginLeft: "10px", fontWeight: "bold" }}
          align="center"
          variant="h4"
        >
          PokeBook
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
