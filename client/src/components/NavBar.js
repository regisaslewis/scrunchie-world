import React from "react";

function NavBar({setUsername, setUserID}) {

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",

        })
        .then(() => {
            setUsername("");
            setUserID(null);
        })
    }

    return (
        <div>
            <h2>Navigation Bar here.</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default NavBar;