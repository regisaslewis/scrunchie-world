import React from "react";
import { NavLink, Redirect } from "react-router-dom"
import OneReview from "./OneReview";
import OneGroup from "./OneGroup";

function Home({
    user,
    reviewList,
    groupList,
    group,
    setGroup,
    userProducts,
    handleGroupChange,
    handleReviewDelete,
    inGroup,
    setReview
    }) {

    if (!user) return <Redirect to="/signup" />; 

    let showGroup = group.map(e => <OneGroup key={e.id} groupList={groupList} user={user} handleGroupChange={handleGroupChange} groupItem={e} setGroup={setGroup} />)

    const userReviews = reviewList.filter(e => e.user_id === user.id)

    const showReviewList = userReviews.map(e => <OneReview user={user} key={e.id} setReview={setReview} handleReviewDelete={handleReviewDelete} reviewItem={e} />)

    const showProducts = userProducts.map(e => 
        <div id="prodName">
            <p key={e.id}>{e.name} </p> 
            <img alt={e.name} src={e.image} style={{"width": "30px"}} />
        </div>)
    
    return (
        <div id="home">
            <h2 id="greeting">Hello, {user.username}!</h2>
            <div id="homeCards">
                <div id="gc" className="card">
                    <h3>{user.username}'s Group:</h3>
                    {inGroup ? 
                    showGroup : 
                    <NavLink to="/groups">
                        <button>Join a Group</button>
                    </NavLink>}
                </div>
                <div id="rc" className="card">
                    <div id="revTitle">
                        <h3>{user.username}'s Reviews:</h3>
                        <NavLink to="/newreviewform" exact>
                            <button>Add a Review</button>
                        </NavLink>
                    </div>
                    {showReviewList.length > 0 ? showReviewList : "No Reviews Written"}
                </div>
                <div id="pc" className="card">
                    <h3 id="nameProd">{user.username}'s Products:</h3>
                    <div id="prod">
                        {showProducts.length > 0 ? showProducts : "No Products Linked"}
                    </div>
                    <div id="linkProd">
                        <NavLink to="/products" exact>
                            <button>Link New Product</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;