import React from "react";

function OneGroup({groupItem}) {

    const { name, members, description } = groupItem;
    const memberList = members.map(e => <p>{e.username}</p>)

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h4>Members:</h4>
            {memberList}
        </div>
    );
}

export default OneGroup;