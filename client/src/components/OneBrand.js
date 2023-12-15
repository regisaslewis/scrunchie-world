import React from "react";
import { NavLink } from "react-router-dom/";

function OneBrand({
    brandItem,
    setBrand
    }) {

    const { name, description, products } = brandItem

    function productsMap() {
        if (brandItem.products.length > 0) {
            return products.map(e => <p key={e.id}>{e.name} ({"💲".repeat(e.cost)})</p>)
        } else {
            return <p style={{"color": "red"}}>No Products yet.</p>
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h4>Products:</h4>
            {productsMap()}
            <NavLink to="/newproductform" exact>
                <button onClick={() => setBrand(brandItem)}>Add a new {name} Product</button>
            </NavLink>
        </div>
    );
}

export default OneBrand;