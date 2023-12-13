import React from "react";
import OneGroup from "./OneGroup";
import { NavLink } from "react-router-dom";

function Groups({groupList, user, handleGroupChange, setGroup}) {

    // SORT BY NORMAL ORDER
    // groupList.sort((a, b) => {
    //     const groupA = a.id;
    //     const groupB = b.id;
    //     if (groupA < groupB) {
    //         return -1;
    //     }
    //     if (groupA > groupB) {
    //         return 1
    //     }
    //     return 0;
    // });

    // SORT BY GROUP NAME 
    // groupList.sort((a, b) => {
    //     const nameA = a.name.toUpperCase();
    //     const nameB = b.name.toUpperCase();
    //     if (nameA < nameB) {
    //         return -1;
    //     }
    //     if (nameA > nameB) {
    //         return 1;
    //     }
    //     return 0;
    // });

    const showGroupList = groupList.map(e => <OneGroup key={e.id} groupList={groupList} user={user} handleGroupChange={handleGroupChange} groupItem={e} setGroup={setGroup} />)

    return (
        <div>
            <h2>You can only be in one Group</h2>
            <h3>Choose Wisely</h3>
            <NavLink to="/" exact>
                <button>Cancel</button>
            </NavLink>
            <p>_________</p>
            {showGroupList}
        </div>
    );
}

export default Groups;