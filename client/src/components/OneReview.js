import React from "react";
import { NavLink } from "react-router-dom";

function OneReview({reviewItem, user, setReview, handleReviewDelete}) {

    const { product, rating, comment} = reviewItem
    const starCount = "⭐".repeat(rating)

    return (
        <div id="review">
            <h2>{reviewItem.user.username} on {product.name}</h2>
            <p id="revCom">{comment}</p>
            <h3>{rating}/5 {starCount}</h3>
            {user && user.id === reviewItem.user_id ?
            <div id="revButtons">
                <NavLink to="/editreviewform">
                    <button onClick={() => setReview(reviewItem)}>Edit Review</button>
                </NavLink>
                <button onClick={() => handleReviewDelete(reviewItem.id)}>Delete Review</button>
            </div>:
            ""}
        </div>
    );
}

export default OneReview;