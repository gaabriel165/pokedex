import React from "react";
import Header from "./components/Header";
import List from "./components/List";
import { Grid } from "@material-ui/core";

const Home = () => {
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
