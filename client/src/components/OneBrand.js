import React from "react";
import { NavLink } from "react-router-dom/";

function OneBrand({brandItem}) {

    const { name, description, products, id } = brandItem
    const productList = products.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h4>Products:</h4>
            {productList}
            <NavLink to="/newproductform">
                <button>Add a new {name} Product</button>
            </NavLink>
        </div>
    );
}

export default OneBrand;