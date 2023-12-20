import React from "react";

function OneGroup({groupList, groupItem, handleGroupChange, user, setGroup}) {

    const { name, members, description, id } = groupItem;

    let newGroup = groupList.filter(e => e.id === id);
    const abrvName = name.length < 16 ? name : name.substring(0, 13) + "..."

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
                return <button onClick={() => handleGroupChange(null)}>Leave<br />{abrvName}</button>
            } else {
                return <button onClick={() => handleClick(id)}>Join<br /> {abrvName}</button>
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
        <div id="group">
            <div id="gInfo">
                <h2>{name}</h2>
                <h3>{description}</h3>
                {checkUser()}
            </div>
            <div id="gMembers">
                {membersMap()}
            </div>
        </div>
    );
}

export default OneGroup;