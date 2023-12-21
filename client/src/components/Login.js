import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

function Login({setUser, userList}) {

    const [passes, setPasses] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const history = useHistory();
    const users = userList.map(e => e.username)

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username."),
        password: yup.string().required("Must enter a password.")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            if (users.includes(formik.values.username)) {
                fetch("/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2)
                })
                .then(resp => resp.json())
                .then(data => {
                    setUser(data);
                    setPasses(true);
                    history.push("/");
                })
            } else {
             setPasses(false)   
            }
        }
    })

    function toggleVisible() {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="signIn">
            <h2>Log In</h2>
            <form className="form" onSubmit={formik.handleSubmit} autoComplete="off">
                <label>Username:</label>
                <input name="username" type="text" onChange={ e => {formik.handleChange(e); setPasses(true)}} value={formik.values.username} />
                {!!formik.errors.username ? <p style={{"color" : "red"}}>{formik.errors.username}</p> : ""}
                <br/>
                <label>Password:</label>
                <div>
                    <input name="password" type = {passwordVisible ? "text" : "password"} value={formik.values.password} onChange={formik.handleChange} />
                    <button tabIndex="-1" className="visible" type="button" onClick={toggleVisible}>{passwordVisible ? "😳" : "😑"}</button>
                    {!!formik.errors.password ? <p style={{"color" : "red"}}>{formik.errors.password}</p> : ""}
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
            {passes ? "" : <p style={{"color" : "red"}}>Not a user.</p>}
            <br />
            <NavLink to="/" exact>
                <button>Sign Up Instead</button>
            </NavLink>
        </div>
    );
}

export default Login;