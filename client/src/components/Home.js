import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom"
import OneReview from "./OneReview";
import OneGroup from "./OneGroup";

function Home({
    user,
    reviewList,
    groupList,
    userProducts,
    setUserProducts
    }) {

    const [userReviews, setUserReviews] = useState(reviewList.filter(e => e.user_id == user.id))

    useEffect(() => {
        fetch("/reviews")
            .then(resp => resp.json())
            .then(data => {
                setUserReviews(data.filter(e => e.user_id == user.id))
            })
    }, [])
    useEffect(() => {
        fetch("/products")
            .then(resp => resp.json())
            .then(data => {
                setUserProducts(data.filter(e => e.owners.some(o => o.id == user.id)))
            })
    }, [])

    const group = groupList.filter(e => e.members.some(o => o.id == user.id))
    const showGroup = group.map(e => <OneGroup key={e.id} groupItem={e} />);

    const showReviewList = userReviews.map(e => <OneReview key={e.id} reviewItem={e} />)
    
    const showProducts = userProducts.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <h2>Hello, {user.username}!</h2>
            <h3>Group:</h3>
            {showGroup.length > 0 ? 
            showGroup : 
            <NavLink to="/groups">
                <button>Join a Group</button>
            </NavLink>}
            <p>_________</p>
            <h3>Reviews:</h3>
            <NavLink to="/newreviewform" exact>
                <button>Add a Review</button>
            </NavLink>
            <br/>
            {!!showReviewList == true ? showReviewList : "No Reviews Written"}
            <p>_________</p>
            <NavLink to="/products" exact>
                <button>Link New Product</button>
            </NavLink>
            <h3>Products:</h3>
            {!!showProducts === true ? showProducts : "No Products Linked"}
        </div>
    );
}

export default Home;