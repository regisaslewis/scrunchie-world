import React from "react";

function OneProduct({
    productItem, 
    userProducts,
    setUserProducts,
    noImage
    }) {

    const { name, brand, cost, image, id } = productItem;
    const brandName = brand.name
    
    function handleClick() {        
        fetch(`/products/${id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(resp => resp.json())
        .then(() => {
            const newArray = [...userProducts, productItem];
            setUserProducts(newArray)
        })
    }

    return (
        <div className="allProd">
            <div className="allProdDetails">
                <h2>{name}</h2>
            </div>
            <div className="allProdDImage">
                <img alt={name} src={image !== "" ? image : noImage} />
            </div>
            <div className="allProdBrand">
                <h3 className="dollars">cost: {"💲".repeat(cost)}</h3>
                <h3>By: {brandName}</h3>
                <button onClick={handleClick}>Link Product</button>
            </div>
        </div>
    );
}

export default OneProduct;