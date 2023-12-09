import React from "react";

function OneProduct({productItem}) {

    const { name, brand, cost } = productItem;

    return (
        <div>
            <h2>{name}</h2>
            
        </div>
    );
}

export default OneProduct;