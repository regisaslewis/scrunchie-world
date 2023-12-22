import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState(null);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [sort, setSort] = useState(1);

  const noImage = "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"

  const buttonOn = {
      color: "rgb(226, 184, 195)",
      boxShadow: "none",
      transform: "scale(.95)",
      zIndex: "-1"
  }

  const buttonOff = {
      color: "white",
      boxShadow: "-5px 5px 10px 1px black"
  }

  useEffect(() => {
    fetch("/check_session")
    .then(resp => {
      if (!resp.ok) {
        handleLogout()
      } else {
        return resp.json()
      }
    })
    .then(user => setUser(user))
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
  }, [user])

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
  }, [])

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
        reviewList={reviewList}
        setReviewList={setReviewList}
        groupList={groupList}
        setGroupList={setGroupList}
        productList={productList}
        setProductList={setProductList}
        brandList={brandList}
        setBrandList={setBrandList}
        setSort={setSort}
      />
      <Switch>
        <Route exact path="/">
          {!!user ?
          <Home 
            user={user}
            handleGroupChange={handleGroupChange}
            reviewList={reviewList}
            setReview={setReview}
            groupList={groupList}
            group={group}
            handleReviewDelete={handleReviewDelete}
            setGroup={setGroup}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
          />:
          <Redirect to="/signup" />}
        </Route>
        <Route path="/signup">
          {!user ?
          <SignUp
            user={user}
            setUser={setUser}
            userList={userList}
            setUserList={setUserList}
          />:
          <Redirect to="/" exact />}
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
            setGroupList={setGroupList}
            buttonOn={buttonOn}
            buttonOff={buttonOff}
            sort={sort}
            setSort={setSort}
          />
        </Route>
        <Route path="/brands">
          <Brands
            noImage={noImage}
            brandList={brandList}
            setBrand={setBrand}
            buttonOn={buttonOn}
            buttonOff={buttonOff}
            sort={sort}
            setSort={setSort}
            productList={productList}
            setBrandList={setBrandList}
          />
        </Route>
        <Route path="/reviews">
          <Reviews 
            handleReviewDelete={handleReviewDelete}
            reviewList = {reviewList}
            setReviewList={setReviewList}
            setReview={setReview}
            user={user}
            buttonOn={buttonOn}
            buttonOff={buttonOff}
            sort={sort}
            setSort={setSort}
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
          {!! review ?
          <EditReviewForm 
            review={review}
            user={user}
            handleReviewUpdate={handleReviewUpdate}
          />:
          <Redirect to="/" />}
        </Route>
        <Route path="/allproducts">
          <AllProducts
            noImage={noImage}
            user={user}
            setProduct={setProduct}
            setBrand={setBrand}
            productList={productList}
            setProductList={setProductList}
            buttonOn={buttonOn}
            buttonOff={buttonOff}
            sort={sort}
            setSort={setSort}
          />
        </Route>
        <Route path="/products">
            <Products
            noImage={noImage}
            user={user}
            setUser={setUser}
            userList={userList}
            productList={productList}
            setProductList={setProductList}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
            buttonOn={buttonOn}
            buttonOff={buttonOff}
            sort={sort}
            setSort={setSort}
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
              {!!brand ?
              <EditProductForm
                brand={brand}
                product={product}
                handleProductUpdate={handleProductUpdate}
              />: 
              <Redirect to="/allproducts" />}
              
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
