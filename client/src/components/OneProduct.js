import React from "react";

function OneProduct({
    productItem, 
    userProducts,
    setUserProducts
    }) {

    const { name, brand, cost, image, id } = productItem;
    const brandName = brand.name
    const noImage = "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    
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
        <div>
            <h2>{name}</h2>
            <img alt={name} src={image !== "" ? image : noImage} />
            <h3>{brandName}</h3>
            <h5>{"💲".repeat(cost)}</h5>
            <button onClick={handleClick}>Link Product</button>
            <p>_________</p>    
        </div> 
    );
}

export default OneProduct;