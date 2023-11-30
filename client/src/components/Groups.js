import React from "react";
import OneGroup from "./OneGroup";

function Groups({groupList}) {

    const showGroupList = groupList.map(e => <OneGroup key={e.id} groupItem={e} />)

    return (
        <div>
            <h2>Groups Page Here.</h2>
            {showGroupList}
        </div>
    );
}

export default Groups;