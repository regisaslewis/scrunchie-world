import React from "react";
import OneProduct from "./OneProduct";
import { NavLink } from "react-router-dom";

function Products({
    user, 
    userList,
    userProducts,
    notUserProducts,
    setUserProducts
    }) {
        
    const showProductList = notUserProducts.map(e => <OneProduct 
        userProducts={userProducts}
        setUserProducts={setUserProducts}
        userList={userList}
        user={user} 
        key={e.id} 
        productItem={e} 
        />)
        
    return (
        <div>
            <h2>Products Page Here.</h2>
            {!!user ? showProductList : ""}
            <NavLink to="/" exact>
                <button>Cancel</button>
            </NavLink>
        </div>
    );
}

export default Products;