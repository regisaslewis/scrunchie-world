import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

function NewGroupForm({groupList, setGroupList}) {

    const history = useHistory();

    const formSchema = yup.object().shape({
        name: yup.string().required().min(4).max(25),
        description: yup.string().required().min(5).max(100)
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            members: []
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch("/groups", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(resp => resp.json())
            .then(data => {
                const newGroupList = [...groupList, data[0]];
                setGroupList(newGroupList);
                history.push("/groups");
            })
        }
    })

    return (
        <div className="signIn">
            <h2>New Group Info</h2>
            <br />
            <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Group Name:</label>
                <input name="name" type="text" value={formik.values.name} onChange={formik.handleChange} />
                {!!formik.errors.name ? <p style={{"color" : "red"}}>{formik.errors.name}</p> : ""}
                <br />
                <label>Description:</label>
                <textarea rows="2" cols="38" name="description" type="text" value={formik.values.description} onChange={formik.handleChange} />
                {!!formik.errors.description ? <p style={{"color" : "red"}}>{formik.errors.description}</p> : ""}
                <br />
                <button type="submit">Submit New Group</button>
            </form>
            <br />
            <NavLink to="/groups" exact>
                <button>Cancel</button>
            </NavLink>
        </div>
    )
};

export default NewGroupForm;