import React from "react";
import OneGroup from "./OneGroup";

function Groups({groupList}) {

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

    const showGroupList = groupList.map(e => <OneGroup key={e.id} groupItem={e} />)

    return (
        <div>
            <h2>Groups Page Here.</h2>
            {showGroupList}
        </div>
    );
}

export default Groups;