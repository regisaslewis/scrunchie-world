import React from "react";

function OneGroup({groupItem, user}) {

    const { name, members, description } = groupItem;
    const memberList = members.map(e => <p key={e.id}>{e.username}</p>)

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h4>Members:</h4>
            {memberList}
            <button>Join {name}</button>
        </div>
    );
}

export default OneGroup;