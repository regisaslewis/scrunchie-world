import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";

function App() {

  const [groupList, setGroupList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/groups")
      .then(resp => resp.json())
      .then(data => setGroupList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/brands")
      .then(resp => resp.json())
      .then(data => setBrandList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/reviews")
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
          {username ? 
          <h2>Hello, {username}!</h2> : 
          <SignUp
            setUsername = {setUsername}
          />}
        </Route>
        <Route path="/login">
            <Login
              setUsername = {setUsername}
            />
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
