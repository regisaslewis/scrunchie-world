import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Logo.png";

function NavBar({
    user, 
    handleLogout,
    reviewList,
    setReviewList,
    brandList,
    setBrandList,
    productList,
    setProductList,
    groupList,
    setGroupList,
    setSort
    }) {
    
    function sortOldest(y, z) {
        let sorted = y.toSorted((a, b) => {
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
        z(sorted);
        setSort(1);
    };

    return (
        <div id="navBar">
            <div id="logoBox">
                <img className="logo" alt="logo" src={logo} />
            </div>
            <div id="navData">
                <NavLink to="/allproducts" exact>
                    <button onClick={() => sortOldest(productList, setProductList)} >All Products</button>
                </NavLink>
                <NavLink to="/brands" exact>
                    <button onClick={() => sortOldest(brandList, setBrandList)} >Brands</button>
                </NavLink>
                <NavLink to="/groups" exact>
                    <button onClick={() => sortOldest(groupList, setGroupList)} >User Groups</button>
                </NavLink>
                <NavLink to="/reviews" exact>
                    <button onClick={() => sortOldest(reviewList, setReviewList)} >Reviews</button>
                </NavLink>
                <div id="logButtons">
                    <NavLink to="/" exact>
                        {!user ? "" : <button onClick={() => sortOldest(reviewList, setReviewList)} className="logButton">Home</button>}
                    </NavLink>
                    {!!user ?
                    <NavLink to="/" exact>
                        <button className="logButton" onClick={handleLogout}>Logout</button>
                    </NavLink>:
                    <NavLink to="/login" exact>
                            <button className="logButton">Log In</button>
                        </NavLink>}
                </div>
            </div>
        </div>
    );
}

export default NavBar;