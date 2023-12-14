import React from "react";
import OneProduct from "./OneProduct";
import { NavLink } from "react-router-dom";

function AllProducts({
    user, 
    userList,
    userProducts,
    setUserProducts,
    productList,
    }) {
    
    // let userProductsIDs = userProducts.map(e => e.id)
    // let unlinkedProductList = productList.filter(({id}) => !userProductsIDs.includes(id));
    const showProductList = productList.map(e => <OneProduct 
        userProducts={userProducts}
        setUserProducts={setUserProducts}
        userList={userList}
        user={user} 
        key={e.id} 
        productItem={e} 
        />)
        
    return (
        <div>
            <h2>All Products Page Here.</h2>
            {showProductList}
            <NavLink to="/" exact>
                <button>Return</button>
            </NavLink>
        </div>
    );
}

export default AllProducts;