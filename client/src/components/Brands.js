import React from "react";
import { NavLink } from "react-router-dom";
import OneBrand from "./OneBrand";

function Brands({
    brandList,
    setBrandList,
    setBrand,
    noImage,
    productList,
    buttonOn,
    buttonOff,
    sort,
    setSort,
    }) {

    function sortOldest() {
        let sorted = brandList.toSorted((a, b) => {
            const brandA = a.id;
            const brandB = b.id;
            if (brandA < brandB) {
                return -1;
            }
            if (brandA > brandB) {
                return 1;
            }
            return 0;
        });
        setBrandList(sorted)
        setSort(1);
    };

    function sortBrandName() {
        let sorted = brandList.toSorted((a, b) => {
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
        setBrandList(sorted);
        setSort(2)
    };
    
    function sortCheapest() {
        let sorted = brandList.toSorted((a, b) => {
            let sumA = 0;
            let sumB = 0;
            a.products.forEach(e => {
                sumA += e.cost;
            })
            b.products.forEach(e => {
                sumB += e.cost;
            })
            if (a.products.length > 1) {
                sumA /= a.products.length
            }
            if (b.products.length > 1) {
                sumB /= b.products.length
            }
            if (sumA < sumB) {
                return -1;
            }
            if (sumA > sumB) {
                return 1
            }
            return 0;
        });
        setBrandList(sorted);
        setSort(3)
    };
    
    function sortCostliest() {
        let sorted = brandList.toSorted((a, b) => {
            let sumA = 0;
            let sumB = 0;
            a.products.forEach(e => {
                sumA += e.cost;
            })
            b.products.forEach(e => {
                sumB += e.cost;
            })
            if (a.products.length > 1) {
                sumA /= a.products.length
            }
            if (b.products.length > 1) {
                sumB /= b.products.length
            }
            if (sumA < sumB) {
                return 1;
            }
            if (sumA > sumB) {
                return -1
            }
            return 0;
        });
        setBrandList(sorted);
        setSort(4)
    };

    const showBrandList = brandList.map(e => <OneBrand 
        key={e.id} 
        brandItem={e}
        setBrand={setBrand}
        noImage={noImage}
        productList={productList}
        />)

    return (
        <div>
            <div className="header">
                <NavLink to="/newbrandform" exact>
                    <button>Add a New Brand</button>
                </NavLink>
                <h2 className="brandGreeting">All Brands</h2>
                <div className="sortButtons">
                    <h4 className="brandGreeting">Sort:</h4>
                    <button style={sort === 1 ? buttonOn : buttonOff} onClick={() => sortOldest()}>Oldest</button>
                    <button style={sort === 2 ? buttonOn : buttonOff} onClick={() => sortBrandName()}>Brand Name</button>
                    <button title="CHEAPEST Avg." style={sort === 3 ? buttonOn : buttonOff} onClick={() => sortCheapest()}>💲</button>
                    <button title="COSTLIEST Avg." style={sort === 4 ? buttonOn : buttonOff} onClick={() => sortCostliest()}>💲💲💲💲💲</button>
                </div>
            </div>
            <div id="brandList">
                {showBrandList}
            </div>
        </div>
    );
}

export default Brands;