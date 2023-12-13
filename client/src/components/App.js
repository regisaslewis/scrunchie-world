import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";
import NewReviewForm from "./NewReviewForm";
import Products from "./Products";

function App() {

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [group, setGroup] = useState([]);
  const [inGroup, setInGroup] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [notUserProducts, setNotUserProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then(resp => resp.json())
      .then(data => {
        setUserList(data);
    })
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/check_session")
    .then(resp => {
      if (!resp.ok) {
        handleLogout()
      } else {
        return resp.json()
      }
    })
    .then(user => {
      setUser(user);
      if (user.group_id !== null) {
        setInGroup(true)
      }
    })
  }, [])

    useEffect(() => {
      fetch("/products")
      .then(resp => resp.json())
      .then(data => {
        setProductList(data);
        let userLinkedProducts = user.products;
        let userUnlinkedProducts = data.filter(e => !e.owners.some(o => o.id == user.id));
        setUserProducts(() => setUserProducts(userLinkedProducts));
        setNotUserProducts(() => setNotUserProducts(userUnlinkedProducts));
      })
      .catch(error => console.log(error.message))
      fetch("/reviews")
      .then(resp => resp.json())
      .then(data => {
        setReviewList(data);
        let userRevs = data.filter(e => e.user_id == user.id);
        setUserReviews(userRevs);
      })
      .catch(error => console.log(error.message))
    }, [user, inGroup])

  useEffect(() => {
    fetch("/groups")
      .then(resp => resp.json())
      .then(data => setGroupList(data))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    setGroup(groupList.filter(e => e.members.some(o => o.id == user.id)))
  }, [groupList])

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

  function handleLogout() {
    fetch("/logout", {
        method: "DELETE",
    })
    .then(() => {
        setUser(null);
        setUserProducts([]);
        setNotUserProducts([]);
        setUserReviews([]);
    })
}

function handleGroupChange(newGroupID) {
  fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          group_id: newGroupID
      }),
  })
  .then(resp => resp.json())
  .then(data => {
    if (data.group === null) {
      setInGroup(false);
    } else {
      setInGroup(true);
    }
    setUser(data);
  })
}

  return (
    <div>
      <NavBar
      handleLogout={handleLogout}
      user={user}
      />
      <h1>Scrunchie World Client</h1>
      <Switch>
        <Route exact path="/">
          {!!user ? 
          <Home 
            user={user}
            inGroup={inGroup}
            setinGroup={setInGroup}
            handleGroupChange={handleGroupChange}
            reviewList={reviewList}
            groupList={groupList}
            group={group}
            setGroup={setGroup}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
          /> : 
          <SignUp
            setUser={setUser}
          />}
        </Route>
        <Route path="/login">
            <Login
              userList = {userList}
              setUser={setUser}
            />
        </Route>
        <Route path="/groups">
          <Groups
            user={user}
            setGroup={setGroup}
            handleGroupChange={handleGroupChange}
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
        <Route path="/products">
            <Products
            user={user}
            userList={userList}
            userProducts={userProducts}
            notUserProducts={notUserProducts}
            setUserProducts={setUserProducts}
            />
        </Route>
        <Route path="/newreviewform">
          <NewReviewForm
            user={user}
            productList = {productList}
            reviewList={reviewList}
            userProducts={userProducts}
            userReviews={userReviews}
            setReviewList = {setReviewList}
            setUserReviews={setUserReviews}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
