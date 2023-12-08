import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";
import NewReviewForm from "./NewReviewForm"

function App() {

  const [groupList, setGroupList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then(resp => resp.json())
      .then(data => setUserList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/check_session")
    .then(resp => resp.json())
    .then(user => {
      setUsername(user.username);
      setUserID(user.id);
    })
    }, [])

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
  }, [setReviewList])

  useEffect(() => {
    fetch("/products")
      .then(resp => resp.json())
      .then(data => setProductList(data))
      .catch(error => console.log(error.message))
  }, [])

  return (
    <div>
      <NavBar
      setUsername={setUsername}
      setUserID={setUserID}
      />
      <h1>Scrunchie World Client</h1>
      <Switch>
        <Route exact path="/">
          {!!username ? 
          <Home 
          username={username}
          reviewList={reviewList}
          groupList={groupList}
          productList={productList}
          userID={userID}
          /> : 
          <SignUp
            setUsername = {setUsername}
            setUserID={setUserID}
          />}
        </Route>
        <Route path="/login">
            <Login
              userList = {userList}
              setUsername = {setUsername}
              setUserID={setUserID}
            />
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
        <Route path="/newreviewform">
          <NewReviewForm
          userID = {userID}
          productList = {productList}
          reviewList={reviewList}
          setReviewList = {setReviewList}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
