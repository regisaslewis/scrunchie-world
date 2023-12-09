import React, { useState } from "react";
import OneProduct from "./OneProduct";
import { NavLink } from "react-router-dom";

function Products({productList, userID, userList}) {

    const [linkedList, setLinkedList] = useState(productList.filter(e => e.owners.some(o => o.id == userID)))
    const [unlinkedList, setUnlinkedList] = useState(productList.filter(e => !e.owners.some(o => o.id == userID)))

    const showProductList = unlinkedList.map(e => <OneProduct 
        linkedList={linkedList}
        setLinkedList={setLinkedList}
        userList={userList}
        userID={userID} 
        key={e.id} 
        productItem={e} 
        />)

    return (
        <div>
            <h2>Products Page Here.</h2>
            {showProductList}
            <NavLink to="/" exact>
                <button>Cancel</button>
            </NavLink>
        </div>
    );
}

export default Products;