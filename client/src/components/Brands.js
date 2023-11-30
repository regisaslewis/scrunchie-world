import React from "react";
import OneBrand from "./OneBrand";

function Brands({brandList}) {

    const showBrandList = brandList.map(e => <OneBrand key={e.id} brandItem={e} />)

    return (
        <div>
            <h2>Brands Page Here.</h2>
            {showBrandList}
        </div>
    );
}

export default Brands;