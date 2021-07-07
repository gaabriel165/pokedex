import React from "react";
import Header from "./components/Header";
import List from "./components/List";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width:"100%"
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid container item xs={12}>
          <Header />
        </Grid>
        <Grid container item>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
