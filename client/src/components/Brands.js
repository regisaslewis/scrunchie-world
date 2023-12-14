import React from "react";
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
            {showBrandList}
        </div>
    );
}

export default Brands;