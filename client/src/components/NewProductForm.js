import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

function NewProductForm({
    productList, 
    brand,
    setProductList
    }) {
    const history = useHistory();

    const formSchema = yup.object().shape({
        name: yup.string().required(),
        cost: yup.number().positive().integer().required().min(1).max(5)
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            cost: 1,
            brand_id: brand.id,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/allproducts", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(resp => resp.json())
            .then(data => {
                const newProductList = [...productList, data];
                setProductList(newProductList);
                history.push("/brands");
            })
        }
    });

    return (
        <div>
            <h2>New {brand.name} Product Form.</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
                <button type="submit">Submit New Product</button>
            </form>
            <NavLink to="/brands">
                <button>Return</button>
            </NavLink>
        </div>
    )
}

export default NewProductForm;