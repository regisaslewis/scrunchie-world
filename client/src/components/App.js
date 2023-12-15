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
import AllProducts from "./AllProducts.js";
import NewProductForm from "./NewProductForm";
import NewBrandForm from "./NewBrandForm";
import NewGroupForm from "./NewGroupForm";
import EditProductForm from "./EditProductForm";

function App() {

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [group, setGroup] = useState([]);
  const [inGroup, setInGroup] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState(null)
  const [userProducts, setUserProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

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
        let userLinkedProducts = user.products;
        setUserProducts(() => setUserProducts(userLinkedProducts));
      })
      .catch(error => console.log(error.message))
      fetch("/reviews")
      .then(resp => resp.json())
      .then(data => {
        setReviewList(data);
        if (!!user) {
          let userRevs = data.filter(e => e.user_id === user.id);
          setUserReviews(userRevs);
        }
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

  return (
    <div>
      <NavBar
      handleLogout={handleLogout}
      user={user}
      />
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
            brandList={brandList}
            setBrand={setBrand}
          />
        </Route>
        <Route path="/reviews">
          <Reviews 
            reviewList = {reviewList}
          />
        </Route>
        <Route path="/allproducts">
          <AllProducts 
            user={user}
            userList={userList}
            setProduct={setProduct}
            setBrand={setBrand}
            userProducts={userProducts}
            productList={productList}
            setUserProducts={setUserProducts}
          />
        </Route>
        <Route path="/products">
            <Products
            user={user}
            userList={userList}
            userProducts={userProducts}
            productList={productList}
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
                productList={productList}
                setProductList={setProductList}
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
