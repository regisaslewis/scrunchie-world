import React from "react";

function OneGroup({groupList, groupItem, handleGroupChange, user, setGroup}) {

    const { name, members, description, id } = groupItem;

    let newGroup = groupList.filter(e => e.id === id);

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

    function checkUser() {
        if (!!user) {
            if (user.group_id === id) {
                return <button onClick={() => handleGroupChange(null)}>Leave current group: {name}</button>
            } else {
                return <button onClick={() => handleClick(id)}>Join {name}</button>
            }
        } else {
            return ""
        }
    }

    function handleClick() {
        handleGroupChange(id);
        setGroup(newGroup);
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            {membersMap()}
            {checkUser()}
        </div>
    );
}

export default OneGroup;