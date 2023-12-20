import React, { useState } from "react";
import OneGroup from "./OneGroup";
import { NavLink } from "react-router-dom";

function Groups({
    groupList,
    user,
    handleGroupChange, 
    setGroup,
    setGroupList,
    buttonOn,
    buttonOff
}) {

    const [sortOldest, setSortOldest] = useState(true)

    // SORT BY NORMAL ORDER
    function ageSort() {
        let sorted = groupList.toSorted((a, b) => {
            const groupA = a.id;
            const groupB = b.id;
            if (groupA < groupB) {
                return -1;
            }
            if (groupA > groupB) {
                return 1
            }
            return 0;
        });
        setGroupList(sorted);
        setSortOldest(true);
    }
    

    // SORT BY GROUP NAME 
    function nameSort() {
        let sorted = groupList.toSorted((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setGroupList(sorted);
        setSortOldest(false);
    }

    let showGroupList = groupList.map(e => <OneGroup key={e.id} groupList={groupList} user={user} handleGroupChange={handleGroupChange} groupItem={e} setGroup={setGroup} />)

    return (
        <div>
            <div className="header">
                <div className="blurb">
                    <NavLink to="/" exact>
                        <button>Return</button>
                    </NavLink>
                    <NavLink to="/newgroupform" exact>
                        <button>Create New Group</button>
                    </NavLink>
                </div>
                <h2>Choose a Group</h2>
                <div className="sortButtons">
                    <h4>Sort:</h4>
                    <button style={sortOldest ? buttonOn : buttonOff} onClick={() => ageSort()}>Oldest</button>
                    <button style={sortOldest ? buttonOff : buttonOn} onClick={() => nameSort()}>Alphabetical</button>
                </div>
            </div>
            <div id="groupList">
                {showGroupList}
            </div>
        </div>
    );
}

export default Groups;