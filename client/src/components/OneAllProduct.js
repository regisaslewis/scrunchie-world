import React from "react";
import { NavLink } from "react-router-dom";

function OneAllProduct({
    productItem,
    setBrand
    }) {

    const { name, brand, cost } = productItem;
    const brandName = brand.name

    return (
        <div>
            <h2>{name}</h2>
            <h3>{brandName}</h3>
            <h5>{"💲".repeat(cost)}</h5>
            <NavLink to="/newproductform" exact>
                <button onClick={() => setBrand(brand)}>Add new {brandName} product</button>
            </NavLink>
            <p>_________</p>    
        </div> 
    );
}

export default OneAllProduct;