import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

function NewProductForm({productList, id}) {
    console.log(id)
    return (
        <div>
            <h2>New Product Form here.</h2>
            <NavLink to="/brands">
                <button>Return</button>
            </NavLink>
        </div>
    )
}

export default NewProductForm;