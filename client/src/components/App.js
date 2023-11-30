import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";

function App() {

  const [groupList, setGroupList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/groups")
      .then(resp => resp.json())
      .then(data => setGroupList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5555/brands")
      .then(resp => resp.json())
      .then(data => setBrandList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5555/reviews")
      .then(resp => resp.json())
      .then(data => setReviewList(data))
      .catch(error => console.log(error.message))
  }, [])

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
          <Groups
            groupList = {groupList}
          />
        </Route>
        <Route path="/brands">
          <Brands
            brandList = {brandList}
          />
        </Route>
        <Route path="/reviews">
          <Reviews 
            reviewList = {reviewList}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
