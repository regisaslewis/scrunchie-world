import React from "react";
import { NavLink } from "react-router-dom/";

function OneBrand({
    brandItem,
    setBrand,
    noImage,
    productList
    }) {

    const { name, description } = brandItem

    let brandProducts = productList.filter(e => e.brand.name == name)

    function productsMap() {
        if (brandProducts.length > 0) {
            return brandProducts.map(e => 
                <div key={e.id}>
                    <p>
                        {e.name} 
                        <br /> 
                        ({"💲".repeat(e.cost)})
                    </p>
                    <img style={{"width": "70px"}} alt={e.name} src={e.image !== "" ? e.image : noImage} />
                </div>
                )
        } else {
            return <p style={{"color": "red"}}>No Products yet.</p>
        }
    }

    return (
        <div id="brand">
            <div id="brandDetails">
                <h2>{name}</h2>
                <h3>{description}</h3>
            </div>
            <div id="newProd">
                <NavLink to="/newproductform" exact>
                    <button onClick={() => setBrand(brandItem)}>Add New<br />"{name}"<br />Product</button>
                </NavLink>
                <p>Total Products: {brandProducts.length}</p>
            </div>
            <div id="brandProds">
                {productsMap()}              
            </div>
        </div>
    );
}

export default OneBrand;