import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({
    user, 
    handleLogout,
    reviewList,
    setReviewList
    }) {
    
    function sortOldest() {
        let sorted = reviewList.toSorted((a, b) => {
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
        setReviewList(sorted);
    };

    return (
        <div id="navBar">
            <h1>Scrunchie World!!</h1>
            <NavLink to="/allproducts" exact>
                <button>All Products</button>
            </NavLink>
            <NavLink to="/brands" exact>
                <button>Brands</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button>User Groups</button>
            </NavLink>
            <NavLink to="/reviews" exact>
                <button>Reviews</button>
            </NavLink>
            <div id="logButtons">
                <NavLink to="/" exact>
                    {!user ? "" : <button onClick={sortOldest} className="logButton">Home</button>}
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
    );
}

export default NavBar;