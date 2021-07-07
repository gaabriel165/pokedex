import React from "react";
import Header from "./components/Header";
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
      </Grid>
    </>
  );
};

export default Home;
