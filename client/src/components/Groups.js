import React from "react";
import OneGroup from "./OneGroup";
import { NavLink } from "react-router-dom";

function Groups({
    groupList,
    user,
    handleGroupChange, 
    setGroup,
    setGroupList,
    buttonOn,
    buttonOff,
    sort,
    setSort
}) {

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
        setSort(1);
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
        setSort(2);
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
                <h2 className="groupGreeting">Choose a Group</h2>
                <div className="sortButtons">
                    <h4>Sort:</h4>
                    <button style={sort === 1 ? buttonOn : buttonOff} onClick={() => ageSort()}>Oldest</button>
                    <button style={sort === 2 ? buttonOn : buttonOff} onClick={() => nameSort()}>Alphabetical</button>
                </div>
            </div>
            <div id="groupList">
                {showGroupList}
            </div>
        </div>
    );
}

export default Groups;