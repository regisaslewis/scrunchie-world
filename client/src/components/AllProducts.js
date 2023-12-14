import React from "react";
import OneAllProduct from "./OneAllProduct";
import { NavLink } from "react-router-dom";

function AllProducts({
    productList,
    }) {
        
    const showProductList = productList.map(e => <OneAllProduct 
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