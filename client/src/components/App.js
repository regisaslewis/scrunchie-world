import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "../App.css"
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Groups from "./Groups";
import Brands from "./Brands";
import Reviews from "./Reviews";
import NewReviewForm from "./NewReviewForm";
import Products from "./Products";
import AllProducts from "./AllProducts.js";
import NewProductForm from "./NewProductForm";
import NewBrandForm from "./NewBrandForm";
import NewGroupForm from "./NewGroupForm";
import EditProductForm from "./EditProductForm";
import EditReviewForm from "./EditReviewForm";

function App() {

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [group, setGroup] = useState([]);
  const [inGroup, setInGroup] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState(null)
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState(null)
  const [userProducts, setUserProducts] = useState([])

  const noImage = "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"

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
      if (!!user && user.group_id !== null) {
        setInGroup(true)
      }
    })
  }, [])

  useEffect(() => {
    fetch("/users")
      .then(resp => resp.json())
      .then(data => {
        setUserList(data);
    })
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/products")
    .then(resp => resp.json())
    .then(data => {
      setProductList(data);
      if (!!user) {
        let userLinkedProducts = user.products;
        setUserProducts(() => setUserProducts(userLinkedProducts));
      }
    })
    .catch(error => console.log(error.message))
  }, [user])

  useEffect(() => {
    fetch("/reviews")
    .then(resp => resp.json())
    .then(data => {
      setReviewList(data);
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
    if (!!user) {
      setGroup(groupList.filter(e => e.members.some(o => o.id === user.id)))
    }
  }, [user, groupList])

  useEffect(() => {
    fetch("/brands")
      .then(resp => resp.json())
      .then(data => {
        setBrandList(data);
        setBrand(null)
      })
      .catch(error => console.log(error.message))
  }, [productList])

  function handleLogout() {
    fetch("/logout", {
        method: "DELETE",
    })
    .then(() => {
        setUser(null);
        setUserProducts([]);
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
    fetch("/groups")
      .then(resp => resp.json())
      .then(data => setGroupList(data))
      .catch(error => console.log(error.message))
  })
}

function handleProductUpdate(updatedProduct) {
  const updatedProducts = productList.map(e => {
    if (e.id === updatedProduct.id) {
      return updatedProduct;
    } else {
      return e;
    }
  });
  setProductList(updatedProducts);
}

function handleReviewUpdate(updatedReview) {
  const updatedReviews = reviewList.map(e => {
    if (e.id === updatedReview.id) {
      return updatedReview;
    } else {
      return e;
    }
  });
  setReviewList(updatedReviews)
}

function handleReviewDelete(id) {
  fetch(`/reviews/${id}`, {
    method: "DELETE",
  })
  .then(resp => resp.json())
  .then(() => {
    console.log("deleted!")
    const updatedReviews = reviewList.filter(e => e.id !== id);
    setReviewList(updatedReviews)
  })
}

  return (
    <div>
      <NavBar
      handleLogout={handleLogout}
      user={user}
      />
      <Switch>
        <Route exact path="/">
          <Home 
            user={user}
            inGroup={inGroup}
            setinGroup={setInGroup}
            handleGroupChange={handleGroupChange}
            reviewList={reviewList}
            setReview={setReview}
            groupList={groupList}
            group={group}
            handleReviewDelete={handleReviewDelete}
            setGroup={setGroup}
            userProducts={userProducts}
          />
        </Route>
        <Route path="/signup">
          <SignUp
            user={user}
            setUser={setUser}
            userList={userList}
            setUserList={setUserList}
          />
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
            noImage={noImage}
            brandList={brandList}
            setBrand={setBrand}
          />
        </Route>
        <Route path="/reviews">
          <Reviews 
            handleReviewDelete={handleReviewDelete}
            reviewList = {reviewList}
            setReview={setReview}
            user={user}
          />
        </Route>
        <Route path="/newreviewform">
          <NewReviewForm
            user={user}
            productList = {productList}
            reviewList={reviewList}
            userProducts={userProducts}
            setReviewList = {setReviewList}
          />
        </Route>
        <Route path="/editreviewform">
          <EditReviewForm 
            review={review}
            user={user}
            handleReviewUpdate={handleReviewUpdate}
          />
        </Route>
        <Route path="/allproducts">
          <AllProducts
            noImage={noImage}
            user={user}
            setProduct={setProduct}
            setBrand={setBrand}
            productList={productList}
          />
        </Route>
        <Route path="/products">
            <Products
            noImage={noImage}
            user={user}
            setUser={setUser}
            userList={userList}
            productList={productList}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
            />
        </Route>
        <Route path="/newproductform">
          <NewProductForm
            brand={brand}
            productList={productList}
            setProductList={setProductList}
            setBrandList={setBrandList}
          />
        </Route>
          <Route path="/editproductform">
              <EditProductForm
                brand={brand}
                product={product}
                handleProductUpdate={handleProductUpdate}
              />
          </Route>
        <Route path="/newbrandform">
          <NewBrandForm 
            brandList={brandList}
            setBrandList={setBrandList}
          />
        </Route>
        <Route path="/newgroupform">
          <NewGroupForm 
            groupList={groupList}
            setGroupList={setGroupList}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
