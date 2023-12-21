import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function EditReviewForm({review, handleReviewUpdate}) {
    const history = useHistory();
    
    const formSchema = yup.object().shape({
        rating: yup.number().positive().integer().required().min(1).max(5),
        comment: yup.string().required().min(5).max(200)
    });

    const formik = useFormik({
        initialValues: {
        rating: review.rating,
        comment: review.comment,
        user_id: review.user_id,
        product_id: review.product_id
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(resp => resp.json())
            .then(data => {
                handleReviewUpdate(data);
                history.goBack();
            })
        }
    });

    return (
        <div className="signIn">
            <h2>Edit {review.product.name} Review</h2>
            <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
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
                <br/>
                <button type="submit">Submit Review</button>
            </form>
            <br/>
            <button onClick={() => history.goBack()}>Cancel</button>
        </div>
    )
}

export default EditReviewForm;