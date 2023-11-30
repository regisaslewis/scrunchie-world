import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Group from "./Group";
import Brand from "./Brand";

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
        <Route path="/group">
          <Group />
        </Route>
        <Route path="/brand">
          <Brand />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
