import React from "react";
import { NavLink } from "react-router-dom";

function OneAllProduct({
    productItem,
    setBrand,
    setProduct,
    noImage
    }) {

    const { name, brand, cost, image } = productItem;
    const brandName = brand.name

    return (
        <div>
            <h2>{name}</h2>
            <img alt={name} src={image !== "" ? image : noImage} />
            <h5>{"💲".repeat(cost)}</h5>
            <NavLink to="/editproductform">
                <button onClick={() => {setBrand(brand); setProduct(productItem)}}>Edit Product</button>
            </NavLink>
            <h3>By: {brandName}</h3>
            <NavLink to="/newproductform" exact>
                <button onClick={() => setBrand(brand)}>Add new {brandName} product</button>
            </NavLink>
            <p>_________</p>
        </div> 
    );
}

export default OneAllProduct;