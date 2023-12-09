import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom"
import OneReview from "./OneReview";
import OneGroup from "./OneGroup";

function Home({
    username, 
    reviewList,
    groupList,
    userID,
    productList
    }) {

    const [userReviews, setUserReviews] = useState(reviewList.filter(e => e.user_id == userID))
    const [products, setProducts] = useState(productList.filter(e => e.owners.some(o => o.id == userID)))

    useEffect(() => {
        fetch("/reviews")
            .then(resp => resp.json())
            .then(data => {
                setUserReviews(data.filter(e => e.user_id == userID))
            })
    }, [])
    useEffect(() => {
        fetch("/products")
            .then(resp => resp.json())
            .then(data => {
                setProducts(data.filter(e => e.owners.some(o => o.id == userID)))
            })
    }, [])

    const group = groupList.filter(e => e.members.some(o => o.id == userID))
    const showGroup = group.map(e => <OneGroup key={e.id} groupItem={e} />);

    const showReviewList = userReviews.map(e => <OneReview key={e.id} reviewItem={e} />)
    
    const showProducts = products.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <h2>Hello, {username}!</h2>
            <h3>Group:</h3>
            {!!showGroup == true ? showGroup : "No Group Joined"}
            <br/>
            {!!showGroup == true ? "" : <button>Join a Group</button>}
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