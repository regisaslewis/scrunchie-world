import React from "react";

function OneReview({reviewItem}) {

    const {user, product, rating, comment} = reviewItem
    const starCount = "⭐".repeat(rating)

    return (
            <div>
                <h2>{user.username}'s Review for {product.name}</h2>
                <h3>{starCount} / 5</h3>
                <p>{comment}</p>
            </div>
    );
}

export default OneReview;