import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Home from "../views/Home/index";

const Routes = () => {
  return (
    <BrowserRouter>
      <Redirect exact from="/" to="/" />
      <Route exact path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
