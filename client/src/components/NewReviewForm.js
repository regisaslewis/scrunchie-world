import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewReviewForm() {

    const formSchema = yup.object().shape({
        product: yup.string().required("Please select a product"),
        rating: yup.number().positive().integer().required().min(1).max(5),
        comment: yup.string().required().min(5).max(200)
    });

    
    return (
        <div>
            <h2>Review Form Page</h2>
        </div>
    )
};

export default NewReviewForm;