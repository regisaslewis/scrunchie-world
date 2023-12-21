import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, NavLink } from "react-router-dom";

function SignUp({ setUser, userList, setUserList }) {

    const history = useHistory()
    const [passwordVisible, setPasswordVisible] = useState(false)
    
    function toggleVisible() {
        setPasswordVisible(!passwordVisible)
    }

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").min(3).max(15),
        age: yup.number().positive().integer().required("Must enter age").typeError("Please enter an integer").max(120),
        hairstyle: yup.string().required("Must describe your hairstyle").max(20),
        password: yup.string().required("Must enter a password."),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match.").required("Passwords must match.")
    });
    
    const formik = useFormik({
        initialValues: {
            username: "",
            age: "",
            hairstyle: "",
            password: "",
            confirmPassword: "",
            group: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
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
            .then((data) => {
                const newUserList = [...userList, data[0]];
                setUserList(newUserList);
                setUser(data[0])
                history.push("/")              
            })
        }
    })

    return (
        <div className="signIn">
            <h2>Sign Up!</h2>
            <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Username:</label>
                <input name="username" value={formik.values.username} onChange={formik.handleChange} />
                {!!formik.errors.username ? <p style={{"color" : "red"}}>{formik.errors.username}</p> : ""}
                <label>Age:</label>
                <input name="age" value={formik.values.age} onChange={formik.handleChange} />
                {!!formik.errors.age ? <p style={{"color" : "red"}}>{formik.errors.age}</p> : ""}
                <label>Hairstyle:</label>
                <input name="hairstyle" value={formik.values.hairstyle} onChange={formik.handleChange} />
                {!!formik.errors.hairstyle ? <p style={{"color" : "red"}}>{formik.errors.hairstyle}</p> : ""}
                <label>Password:</label>
                <div className="password">
                    <input name="password" value={formik.values.password} onChange={formik.handleChange} type={passwordVisible ? "text" : "password"} />
                    <button tabIndex="-1" className="visible" type="button" onClick={toggleVisible}>{passwordVisible ? "😳" : "😑"}</button>
                {!!formik.errors.password ? <p style={{"color" : "red"}}>{formik.errors.password}</p> : ""}
                </div>
                <label>Confirm Password:</label>
                <input name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} type={passwordVisible ? "text" : "password"} />
                {!!formik.errors.confirmPassword ? <p style={{"color" : "red"}}>{formik.errors.confirmPassword}</p> : ""}
                <button className="submit" type="submit">Submit</button>
            </form>
            <br />
            <NavLink to="/login" exact>
                    <button className="logButton">Log In Instead</button>
                </NavLink>
        </div>
    );
}

export default SignUp;