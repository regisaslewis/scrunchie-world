import React from "react";
import { NavLink } from "react-router-dom";

function OneReview({reviewItem, user, setReview, handleReviewDelete}) {

    const { product, rating, comment} = reviewItem
    const starCount = "⭐".repeat(rating)

    return (
        <div>
            <h2>{reviewItem.user.username} on {product.name}</h2>
            <h3>{rating}/5 {starCount}</h3>
            <p>{comment}</p>
            {user.id === reviewItem.user_id ?
            <div>
                <NavLink to="/editreviewform">
                    <button onClick={() => setReview(reviewItem)}>Edit Review</button>
                </NavLink>
                <NavLink to="/">
                    <button onClick={() => handleReviewDelete(reviewItem.id)}>Delete Review</button>
                </NavLink>
            </div>:
            ""
            }
        </div>
    );
}

export default OneReview;