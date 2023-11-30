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
      <Home />
      <SignUp />
      <Group />
      <Brand />
    </div>
  )
}

export default App;
