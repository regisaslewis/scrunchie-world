import React from "react";
import OneReview from "./OneReview";

function Reviews({
    reviewList, 
    setReview, 
    setReviewList, 
    user, 
    handleReviewDelete,
    buttonOn,
    buttonOff,
    sort,
    setSort
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
        setSort(1)
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
        setSort(2)
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
        setSort(3)
    };
    
    function sortRating() {
        let sorted = reviewList.toSorted((a, b) => {
            const prodA = a.rating;
            const prodB = b.rating;
            if (prodA > prodB) {
                return -1;
            }
            if (prodA > prodB) {
                return 1
            }
            return 0;
        });
        setReviewList(sorted);
        setSort(4)
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
            <div className="revHeader">
                <h2 className="revGreeting">All User Reviews</h2>
                <div className="sortButtons">
                    <h4 className="revGreeting">Sort:</h4>
                    <button style={sort === 1 ? buttonOn : buttonOff} onClick={() => sortOldest()}>Oldest</button>
                    <button style={sort === 2 ? buttonOn : buttonOff} onClick={() => sortProdName()}>Product Name</button>
                    <button style={sort === 3 ? buttonOn : buttonOff} onClick={() => sortUserName()}>User Name</button>
                    <button style={sort === 4 ? buttonOn : buttonOff} onClick={() => sortRating()}>Rating</button>
                </div>
            </div>
            <div id="revList">
                {showReviewList}
            </div>            
        </div>
    );
}

export default Reviews;