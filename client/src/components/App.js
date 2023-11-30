import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";

function App() {
  return (
    <div>
      <NavBar />
      <h1>Scrunchie World Client</h1>
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/groups">
          <Groups />
        </Route>
        <Route path="/brands">
          <Brands />
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
