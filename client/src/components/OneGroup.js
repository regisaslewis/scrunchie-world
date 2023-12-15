import React, { useState } from "react";
import { NavLink } from "react-router-dom"

function OneGroup({groupList, groupItem, handleGroupChange, user, setGroup}) {

    const { name, members, description, id } = groupItem;

    let newGroup = groupList.filter(e => e.id === id);
    // let memberList = members.map(e => <p key={e.id}>{e.username}</p>);

    function membersMap() {
        if (groupItem.members.length > 0) {
            const memberList = members.map(e => <p key={e.id}>{e.username}</p>)
            return (
                <div>
                    <h4>Members:</h4>
                    {memberList}
                </div>
            )
        } else {
            return <p style={{"color": "red"}}>No Current Members.</p>
        }
    }

    // function productsMap() {
    //     if (brandItem.products.length > 0) {
    //         return products.map(e => <p key={e.id}>{e.name} ({"💲".repeat(e.cost)})</p>)
    //     } else {
    //         return <p style={{"color": "red"}}>No Products yet.</p>
    //     }
    // }

    function handleClick() {
        handleGroupChange(id);
        setGroup(newGroup);
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            {membersMap()}
            {user.group_id === id ?
            <button onClick={() => handleGroupChange(null)}>Leave current group: {name}</button>:
            <button onClick={() => handleClick(id)}>Join {name}</button>
            }
        </div>
    );
}

export default OneGroup;