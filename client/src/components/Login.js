import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

function Login({setUsername, setUserID}) {

    const [passes, setPasses] = useState(true)
    const history = useHistory();
    let usernames = [];
    

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username."),
        // password: yup.string.required("Must enter a password.")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            // password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users")
            .then(resp => resp.json())
            .then(data => {
                usernames = [];
                for (let i =0; i < data.length; i++) {
                    usernames.push(data[i]["username"])
                    if (data[i]["username"] === formik.values.username) {
                        setUserID(data[i]["id"])
                    }
                }
                if (usernames.includes(formik.values.username)) {
                    setUsername(formik.values.username)
                    setPasses(true)
                    history.push("/")
                } else {
                    setPasses(false)
                }
            })
        }
    })

    return (
        <div>
            <h2>Log In Page Here</h2>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <label>Username:</label>
                <input name="username" type="text" onChange={ e => {formik.handleChange(e); setPasses(true)}} value={formik.values.username} />
                <br/>
                {/* <label>Password:</label>
                <input type="password" /> */}
                <button type="submit">Login</button>
            </form>
            {passes ? "" : <p>Not a user.</p>}
        </div>
    );
}

export default Login;