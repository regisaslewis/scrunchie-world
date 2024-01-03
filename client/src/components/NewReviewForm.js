import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

function NewReviewForm({
    user,
    userProducts,
    productList,
    reviewList,
    setReviewList
}) {

const history = useHistory();

const userReviews = reviewList.filter(e => e.user_id === user.id)
const userReviewIDs = userReviews.map(e => e.product_id)    
const optionsList = userProducts.filter(({id}) => !userReviewIDs.includes(id))

const options = optionsList.map(e => <option key={e.id} id={e.id}>{e.name}</option>);

const [prodID, setProdID] = useState(0);

const formSchema = yup.object().shape({
    product: yup.string().required("Please select a product."),
    rating: yup.number().positive().integer().required().min(1).max(5),
    comment: yup.string().required().min(5).max(200)
});

const formik = useFormik({
    initialValues: {
        rating: 1,
        comment: ""
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2)
        })
        .then(resp => resp.json())
        .then(data => {
            const newReviewList = [...reviewList, data[0]];
            setReviewList(newReviewList);
            history.push("/");
        })
    }
})
    
function getID(e) {
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name === e.target.value) {
            setProdID(productList[i].id)
        }
    }
}

return (
    <div className="signIn">
        <h2>Review New Linked Products</h2>
        <br />
        <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
            <label>Product:</label>
            <select name="product" value={formik.values.product} onChange={e => {getID(e); formik.handleChange(e)}}>
                <option>Select a Product:</option>
                {options}
            </select>
            {!!formik.errors.product ? <p style={{"color" : "red"}}>{formik.errors.product}</p> : ""}
            <br/>
            <label>Rating:</label>
            <select  name="rating" value={formik.values.rating} onChange={formik.handleChange}>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            <br/>
            <label>Comment:</label>
            <textarea rows="4" cols="38" name="comment" value={formik.values.comment} onChange={formik.handleChange} />
            {!!formik.errors.comment ? <p style={{"color" : "red"}}>{formik.errors.comment}</p> : ""}
            <input name="product_id" type="hidden" value={formik.values.product_id = prodID} />
            <input name="user_id" type="hidden" value={formik.values.user_id = user.id} />
            <br/>
            <button type="submit">Submit Review</button>
        </form>
        <br/>
        <NavLink to="/" exact>
            <button>Cancel</button>
        </NavLink>
    </div>
)
};

export default NewReviewForm;