import React, { useState } from "react";
import { NavLink } from "react-router-dom"

function OneGroup({groupList, groupItem, handleGroupChange, user, setGroup}) {

    const { name, members, description, id } = groupItem;

    let newGroup = groupList.filter(e => e.id === id);
    let memberList = members.map(e => <p key={e.id}>{e.username}</p>);

    function handleClick() {
        handleGroupChange(id);
        setGroup(newGroup);
    }
    // UPDATE GROUP LIST IN STATE TO MAKE THIS WORK!!!!

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            {!!memberList ?
            <div>
                <h4>Members:</h4>
                {memberList}
            </div>
            :
            ""}
            {user.group_id === id ?
            <NavLink to="/" exact>
                <button onClick={() => handleGroupChange(null)}>Leave current group: {name}</button>
            </NavLink>:
            <NavLink to="/" exact>
            <button onClick={() => handleClick(id)}>Join {name}</button>
            </NavLink>
            }
        </div>
    );
}

export default OneGroup;