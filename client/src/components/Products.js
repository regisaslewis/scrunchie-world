import React from "react";
import OneProduct from "./OneProduct";

function Products({
    user, 
    userList,
    userProducts,
    setUserProducts,
    productList,
    setProductList,
    noImage,
    buttonOn,
    buttonOff,
    sort,
    setSort
    }) {

    function sortOldest() {
        let sorted = productList.toSorted((a, b) => {
            const prodA = a.id;
            const prodB = b.id;
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setProductList(sorted);
        setSort(1)
    };

    function sortProdName() {
        let sorted = productList.toSorted((a, b) => {
            const prodA = a.name.toUpperCase();
            const prodB = b.name.toUpperCase();
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setProductList(sorted);
        setSort(2)
    };

    function sortBrandName() {
        let sorted = productList.toSorted((a, b) => {
            const prodA = a.brand.name.toUpperCase();
            const prodB = b.brand.name.toUpperCase();
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setProductList(sorted);
        setSort(3)
    };

    function sortCheapest() {
        let sorted = productList.toSorted((a, b) => {
            const prodA = a.cost;
            const prodB = b.cost;
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setProductList(sorted);
        setSort(4)
    };
    
    function sortCostliest() {
        let sorted = productList.toSorted((a, b) => {
            const prodA = a.cost
            const prodB = b.cost;
            if (prodA > prodB) {
                return -1;
            }
            if (prodA < prodB) {
                return 1
            }
            return 0;
        });
        setProductList(sorted);
        setSort(5)
    };
    
    let userProductsIDs = userProducts.map(e => e.id)
    let unlinkedProductList = productList.filter(({id}) => !userProductsIDs.includes(id));
    const showProductList = unlinkedProductList.map(e => <OneProduct 
        userProducts={userProducts}
        setUserProducts={setUserProducts}
        userList={userList}
        user={user}
        noImage={noImage}
        key={e.id} 
        productItem={e} 
        />)
        
    return (
        <div>
            <div className="revHeader">
                <h2 className="prodGreeting">{user.username}'s Unlinked Products</h2>
                <div className="sortButtons">
                    <h4 className="prodGreeting">Sort:</h4>
                    <button style={sort === 1 ? buttonOn : buttonOff} onClick={() => sortOldest()}>Oldest</button>
                    <button style={sort === 2 ? buttonOn : buttonOff} onClick={() => sortProdName()}>Product Name</button>
                    <button style={sort === 3 ? buttonOn : buttonOff} onClick={() => sortBrandName()}>Brand Name</button>
                    <button style={sort === 4 ? buttonOn : buttonOff} onClick={() => sortCheapest()}>💲</button>
                    <button style={sort === 5 ? buttonOn : buttonOff} onClick={() => sortCostliest()}>💲💲💲💲💲</button>
                </div>
            </div>            
            <div className="allProdList">
                {showProductList}
            </div>
        </div>
    );
}

export default Products;