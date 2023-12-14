import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({user, handleLogout}) {

    return (
        <div>
            <h2>Navigation Bar here.</h2>
            {!!user ?
            <NavLink to="/" exact>
                <button onClick={handleLogout}>Logout</button>
            </NavLink>:
            <NavLink to="/login" exact>
                    <button>Log In</button>
                </NavLink>
            }
            <NavLink to="/" exact>
                {!user ? "" : <button>Home</button>}
            </NavLink>
            <NavLink to="/brands" exact>
                <button>Brands</button>
            </NavLink>
            <NavLink to="/allproducts" exact>
                <button>All Products</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button>Groups</button>
            </NavLink>
            <NavLink to="/reviews" exact>
                <button>Reviews</button>
            </NavLink>
        </div>
    );
}

export default NavBar;