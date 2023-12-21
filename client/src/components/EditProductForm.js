import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function EditProductForm({
    brand,
    product,
    handleProductUpdate,
    }) {
    const history = useHistory();

    const formSchema = yup.object().shape({
        name: yup.string().required(),
        cost: yup.number().positive().integer().required().min(1).max(5),
        image: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            name: product.name,
            cost: product.cost,
            image: product.image,
            brand_id: brand.id,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/allproducts/${product.id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(resp => resp.json())
            .then(data => {
                handleProductUpdate(data)
                history.goBack();
            })
        }
    });

    return (
        <div className="signIn">
            <h2>Edit Product</h2>
            <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Product Name:</label>
                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
                <br/>
                <label>Cost:</label>
                <select name="cost" type="number" min="1" max="5" value={formik.values.cost} onChange={formik.handleChange}>
                    <option value="1">💲</option>
                    <option value="2">💲💲</option>
                    <option value="3">💲💲💲</option>
                    <option value="4">💲💲💲💲</option>
                    <option value="5">💲💲💲💲💲</option>
                </select>
                <br />
                <label>Image:</label>
                <textarea rows="3" cols="38" name="image" type="text" value={formik.values.image} onChange={formik.handleChange} />
                <br />
                <button type="submit">Submit Edit</button>
            </form>
            <br />
            <button onClick={() => history.goBack()}>Return</button>
        </div>
    )
}

export default EditProductForm;