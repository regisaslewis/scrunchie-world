import React from "react";

function OneBrand({brandItem}) {

    const { name, description, products } = brandItem
    const productList = products.map(e => <p>{e.name}</p>)

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h4>Products:</h4>
            {productList}
        </div>
    );
}

export default OneBrand;