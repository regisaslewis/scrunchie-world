import React from "react";
import OneProduct from "./OneProduct";

function Products({productList}) {

    const showProductList = productList.map(e => <OneProduct key={e.id} productItem={e} />)

    return (
        <div>
            <h2>Products Page Here.</h2>
            {showProductList}
        </div>
    );
}

export default Products;