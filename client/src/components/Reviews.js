import React from "react";
import OneReview from "./OneReview";

function Reviews({reviewList}) {

    // SORT BY NORMAL ORDER
    // reviewList.sort((a, b) => {
    //     const prodA = a.id;
    //     const prodB = b.id;
    //     if (prodA < prodB) {
    //         return -1;
    //     }
    //     if (prodA > prodB) {
    //         return 1
    //     }
    //     return 0;
    // });

    // // SORT BY PRODUCT NAME
    // reviewList.sort((a, b) => {
    //     const prodA = a.product.name.toUpperCase();
    //     const prodB = b.product.name.toUpperCase();
    //     if (prodA < prodB) {
    //         return -1;
    //     }
    //     if (prodA > prodB) {
    //         return 1
    //     }
    //     return 0;
    // });
    
    // SORT BY USER NAME
    // reviewList.sort((a, b) => {
    //     const prodA = a.user.username.toUpperCase();
    //     const prodB = b.user.username.toUpperCase();
    //     if (prodA < prodB) {
    //         return -1;
    //     }
    //     if (prodA > prodB) {
    //         return 1
    //     }
    //     return 0;
    // });

    const showReviewList = reviewList.map(e => <OneReview key={e.id} reviewItem={e} />)

    return (
        <div>
            <h2>Reviews Page Here.</h2>
            {showReviewList}
        </div>
    );
}

export default Reviews;