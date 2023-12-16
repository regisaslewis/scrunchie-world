import React from "react";
import OneProduct from "./OneProduct";
import { NavLink } from "react-router-dom";

function Products({
    user, 
    userList,
    userProducts,
    setUserProducts,
    productList,
    noImage
    }) {
    
    let userProductsIDs = userProducts.map(e => e.id)
    let unlinkedProductList = productList.filter(({id}) => !userProductsIDs.includes(id));
    const showProductList = unlinkedProductList.map(e => <OneProduct 
        userProducts={userProducts}
        setUserProducts={setUserProducts}
        userList={userList}
        user={user}
        noImage={noImage}
        key={e.id} 
        productItem={e} 
        />)
        
    return (
        <div>
            <h2>Products Page Here.</h2>
            {!!user ? showProductList : ""}
            <NavLink to="/" exact>
                <button>Return</button>
            </NavLink>
        </div>
    );
}

export default Products;