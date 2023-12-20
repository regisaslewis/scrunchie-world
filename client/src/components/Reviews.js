import React from "react";
import OneReview from "./OneReview";

function Reviews({
    reviewList, 
    setReview, 
    setReviewList, 
    user, 
    handleReviewDelete
    }) {

    // SORT BY NORMAL ORDER
    function sortOldest() {
        let sorted = reviewList.toSorted((a, b) => {
            const prodA = a.id;
            const prodB = b.id;
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setReviewList(sorted);
    };

    // SORT BY PRODUCT NAME
    function sortProdName() {
        let sorted = reviewList.toSorted((a, b) => {
            const prodA = a.product.name.toUpperCase();
            const prodB = b.product.name.toUpperCase();
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setReviewList(sorted);
    };

    
    // SORT BY USER NAME
    function sortUserName() {
        let sorted = reviewList.toSorted((a, b) => {
            const prodA = a.user.username.toUpperCase();
            const prodB = b.user.username.toUpperCase();
            if (prodA < prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setReviewList(sorted);
    };

    const showReviewList = reviewList.map(e => <OneReview 
        key={e.id} 
        reviewItem={e}
        user={user}
        setReview={setReview}
        handleReviewDelete={handleReviewDelete}
        />)

    return (
        <div>
            <h2>All user reviews.</h2>
            {showReviewList}
        </div>
    );
}

export default Reviews;