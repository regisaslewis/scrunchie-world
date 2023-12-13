import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({user, handleLogout}) {

    return (
        <div>
            <h2>Navigation Bar here.</h2>
            <NavLink to="/" exact>
                {!!user ? <button onClick={handleLogout}>Logout</button>: ""}
            </NavLink>
        </div>
    );
}

export default NavBar;