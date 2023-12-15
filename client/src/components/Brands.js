import React from "react";
import { NavLink } from "react-router-dom";
import OneBrand from "./OneBrand";

function Brands({
    brandList,
    setBrand
    }) {

    const showBrandList = brandList.map(e => <OneBrand 
        key={e.id} 
        brandItem={e}
        setBrand={setBrand}
        />)

    return (
        <div>
            <h2>Brands Page Here.</h2>
            <NavLink to="/newbrandform" exact>
                <button>Add a New Brand</button>
            </NavLink>
            {showBrandList}
        </div>
    );
}

export default Brands;