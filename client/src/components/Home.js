import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import OneReview from "./OneReview";
import OneGroup from "./OneGroup";

function Home({
    user,
    reviewList,
    groupList,
    group,
    setGroup,
    handleGroupChange,
    handleReviewDelete,
    setReview,
    userProducts,
    setUserProducts
    }) {

    const [isHovered, setIsHovered] = useState(false)
    const [id, setId] = useState(0)

    let showGroup = group.map(e => <OneGroup key={e.id} groupList={groupList} user={user} handleGroupChange={handleGroupChange} groupItem={e} setGroup={setGroup} />)

    const userReviews = reviewList.filter(e => e.user_id === user.id)

    const showReviewList = userReviews.map(e => <OneReview user={user} key={e.id} setReview={setReview} handleReviewDelete={handleReviewDelete} reviewItem={e} />)

    const showProducts = userProducts.map(e => 
        <div id="prodName" 
        title="Click to Remove." 
        onMouseEnter={() => {setIsHovered(true); setId(e.id)}} 
        onMouseLeave={() => {setIsHovered(false); setId(0)}}
        onClick={() => removeProduct(e)} 
        key={e.id}>
            {isHovered && id === e.id ?
            <>
                <p>Unlink {e.name}</p>
                <img alt={e.name} src={e.image} />
            </>:
            <>
                <p>{e.name}</p> 
                <img alt={e.name} src={e.image} />
            </>}            
        </div>)

    function removeProduct(item) {
        fetch(`/products/${item.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(resp => resp.json())
        .then(() => {
            const newList = userProducts.filter(e => e.id !== item.id);
            setUserProducts(newList);
        })
    }

    function prodListStyle() {
        if (showProducts.length < 4) {
            return {"gridTemplateColumns" : "1fr", "font-size" : "18px", "width": "280px"}
        } else if (showProducts.length < 7) {
            return {"gridTemplateColumns" : "1fr 1fr", "font-size" : "16px", "width": "420px"}
        } else {
            return {"gridTemplateColumns" : "1fr 1fr 1fr", "font-size" : "14px", "width": "540px"}
        }
    }
    
    return (
        <div id="home">
            <h2 id="greeting">Hello, {user.username}!</h2>
            <div id="homeCards">
                <div id="gc" className="card">
                    <h3 className="groupGreeting">{user.username}'s Group:</h3>
                    {!!user.group ? 
                    showGroup : 
                    <NavLink to="/groups">
                        <button>Join a Group</button>
                    </NavLink>}
                </div>
                <div id="rc" className="card">
                    <div id="revTitle">
                        <h3 className="revGreeting">{user.username}'s Reviews:</h3>
                        <NavLink to="/newreviewform" exact>
                            <button>Add a Review</button>
                        </NavLink>
                    </div>
                    {showReviewList.length > 0 ? showReviewList : <p className="revGreeting">No Reviews Written</p>}
                </div>
                <div id="pc" className="card">
                    <h3 id="nameProd">{user.username}'s Products:</h3>
                    <div id="prod" style={prodListStyle()}>
                        {showProducts.length > 0 ? showProducts : "No Products Linked"}
                    </div>
                    <div id="linkProd">
                        <NavLink to="/products" exact>
                            <button>Link<br/>New<br/>Product</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;