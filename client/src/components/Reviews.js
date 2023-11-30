import React from "react";
import OneReview from "./OneReview";

function Reviews({reviewList}) {

    const showReviewList = reviewList.map(e => <OneReview key={e.id} reviewItem={e} />)

    return (
        <div>
            <h2>Reviews Page Here.</h2>
            {showReviewList}
        </div>
    );
}

export default Reviews;