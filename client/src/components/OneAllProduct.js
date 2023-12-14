import React from "react";

function OneAllProduct({
    productItem,
    }) {

    const { name, brand, cost } = productItem;
    const brandName = brand.name

    return (
        <div>
            <h2>{name}</h2>
            <h3>{brandName}</h3>
            <h5>{"$".repeat(cost)}</h5>
            <p>_________</p>    
        </div> 
    );
}

export default OneAllProduct;