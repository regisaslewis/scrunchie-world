import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp({ setUsername }) {

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
            fetch("http://localhost:5555/users", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(resp => resp.json())
            .then(data => setUsername(data.username))
        }
    })



    return (
        <div>
            <h2>Sign Up Page Here.</h2>
            <form onSubmit={useFormik.handleSubmit}>
                <label>Username:</label>
                <input name="username" value={formik.values.username} onChange={formik.handleChange} />
                <p>{formik.errors.username}</p>
                <label>Age:</label>
                <input name="age" value={formik.values.age} onChange={formik.handleChnage} />
                <p>{formik.errors.age}</p>
                <label>Hairstyle:</label>
                <input name="hairstyle" value={formik.values.hairstyle} onChange={formik.handleChnage} />
                <p>{formik.errors.hairstyle}</p>
                {/* <label>Username:</label>
                <input name="username" type="text" />
                <br/>
                <label>Age:</label>
                <input name="age" type="text" />
                <br/>
                <label>Hairstyle:</label>
                <input name="hairstyle" type="text" /> */}
            </form>
            <button>Sign Up</button>
            <button>Log In</button>
        </div>
    );
}

export default SignUp;