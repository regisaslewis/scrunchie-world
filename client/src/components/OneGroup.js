import React from "react";
import { NavLink } from "react-router-dom"

function OneGroup({groupList, groupItem, handleGroupChange, user, setGroup}) {

    const { name, members, description, id } = groupItem;
    const memberList = members.map(e => <p key={e.id}>{e.username}</p>);

    let newGroup = groupList.filter(e => e.id === id);

    function handleClick() {
        handleGroupChange(id);
        setGroup(newGroup);
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            {memberList.length > 0 ?
            <div>
                <h4>Other Members:</h4>
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