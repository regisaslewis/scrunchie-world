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
        <div className="allProd">
            <div className="allProdDetails">
                <h2>{name}</h2>
                <NavLink to="/editproductform">
                    <button onClick={() => {setBrand(brand); setProduct(productItem)}}>Edit Product</button>
                </NavLink>
            </div>
            <div className="allProdDImage">
                <img alt={name} src={image !== "" ? image : noImage} />
            </div>
            <div className="allProdBrand">
                <h3 className="dollars">cost: {"💲".repeat(cost)}</h3>
                <h3>By: {brandName}</h3>
                <NavLink to="/newproductform" exact>
                    <button onClick={() => setBrand(brand)}>Add new<br />"{brandName}"<br />product</button>
                </NavLink>
            </div>
        </div> 
    );
}

export default OneAllProduct;