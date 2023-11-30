import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from NavBar;
import { Brand } from Brand;
import { Group } from Group;
import { SignUp } from SignUp;

function App() {
  return (
    <>
      <NavBar/>
      <h1>Scrunchie World Client</h1>;
      <SignUp/>
      <Brand/>
      <Group/>
    </>
  )
}

export default App;
