import React from "react";
import OneReview from "./OneReview";
import OneGroup from "./OneGroup";

function Home({
    username, 
    reviewList,
    groupList,
    userID,
    productList
    }) {

    const group = groupList.filter(e => e.members.some(o => o.id === userID))
    const showGroup = group.map(e => <OneGroup key={e.id} groupItem={e} />);

    const userReviews = reviewList.filter(e => e.user.id === userID)
    const userReviewList = userReviews.map(e => <OneReview key={e.id} reviewItem={e} />)

    const products = productList.filter(e => e.owners.some(o => o.id === userID))
    const showProducts = products.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <h2>Hello, {username}!</h2>
            <h3>Group:</h3>
            {showGroup}
            <p>_________</p>
            <h3>Reviews:</h3>
            {userReviewList}
            <p>_________</p>
            <h3>Products:</h3>
            {showProducts}
        </div>
    );
}

export default Home;