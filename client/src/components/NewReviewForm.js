import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

function NewReviewForm({
        user,
        userProducts,
        userReviews,
        productList,
        reviewList,
        setReviewList,
        setUserReviews
    }) {

    const history = useHistory();

    const userReviewIDs = userReviews.map(e => e.product_id)    
    const optionsList = userProducts.filter(({id}) => !userReviewIDs.includes(id))

    const options = optionsList.map(e => <option key={e.id} id={e.id}>{e.name}</option>);

    const [prodID, setProdID] = useState(0);
    
    const formSchema = yup.object().shape({
        product: yup.string().required("Please select a product"),
        rating: yup.number().positive().integer().required().min(1).max(5),
        comment: yup.string().required().min(5).max(200)
    });

    const formik = useFormik({
        initialValues: {
            rating: "",
            comment: "",
            user_id: user.id,
        },
        validationSchema: formSchema,
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
                const newReviewList = [...reviewList, data];
                setReviewList(newReviewList);
                const newUserReviewList = [...userReviews, data];
                setUserReviews(newUserReviewList)
                history.push("/");
            })
        }
    })
        
    function getID(e) {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].name == e.target.value) {
                setProdID(productList[i].id)
            }
        }
    }

    return (
        <div>
            <h2>Review Form Page</h2><form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Product:</label>
                <select name="product" value={formik.values.product} onChange={e => {getID(e); formik.handleChange(e)}}>
                    <option>Select a Product:</option>
                    {options}
                </select>
                <br/>
                <label>Rating:</label>
                <input name="rating" value={formik.values.rating} onChange={formik.handleChange} />
                <br/>
                <label>Comment:</label>
                <input name="comment" value={formik.values.comment} onChange={formik.handleChange} />
                <input name="product_id" type="hidden" value={formik.values.product_id = prodID} />
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