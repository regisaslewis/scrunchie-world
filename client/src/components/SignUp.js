import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp({ setUser }) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").min(3).max(15),
        age: yup.number().positive().integer().required("Must enter age").typeError("Please enter an integer").max(120),
        hairstyle: yup.string().required("Must describe your hairstyle").max(20),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            age: "",
            hairstyle: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(resp => resp.json())
            .then(data => {
                setUser(data[0])
            })
        }
    })


    return (
        <div>
            <h2>Sign Up Page Here.</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Username:</label>
                <input name="username" value={formik.values.username} onChange={formik.handleChange} />
                <p style={{ color: "red" }}>{formik.errors.username}</p>
                <label>Age:</label>
                <input name="age" value={formik.values.age} onChange={formik.handleChange} />
                <p style={{ color: "red" }}>{formik.errors.age}</p>
                <label>Hairstyle:</label>
                <input name="hairstyle" value={formik.values.hairstyle} onChange={formik.handleChange} />
                <p style={{ color: "red" }}>{formik.errors.hairstyle}</p>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;