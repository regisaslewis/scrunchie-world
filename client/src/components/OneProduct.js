import React from "react";

function OneProduct({
    productItem, 
    userID, 
    userList,
    setLinkedList,
    linkedList
    }) {

    const { name, brand, cost, id, owners } = productItem;
    const brandName = brand.name

    function getUser() {
        for (let i of userList) {
            if (i.id == userID)
            return i
        }
    }

    function handleClick() {
        owners.push(getUser());

        fetch(`/products/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owners: owners
            }),
        })
        .then(resp => resp.json())
        .then(() => {
            const newArray = [...linkedList, productItem];
            setLinkedList(newArray)
        })
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>{brandName}</h3>
            <h5>{"$".repeat(cost)}</h5>
            <button onClick={handleClick}>Link Product</button>
            <p>_________</p>    
        </div> 
    );
}

export default OneProduct;