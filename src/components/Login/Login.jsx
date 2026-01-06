import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginschema } from "../../schemas";
import { FaWallet } from "react-icons/fa6";
import logo from "../../assets/expense-img.png";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginschema,
      onSubmit: (values, action) => {
        localStorage.setItem("login", JSON.stringify(values));
        action.resetForm();
        navigate("/");
      },
    });

  return (
    <div className="login-page">

      {/* LEFT SECTION */}
      <div className="login-left">
        <img src={logo} alt="Logo" />
        <h1>Personal Expense Tracker</h1>
        <p>Track, manage & control your daily expenses easily</p>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-card">

          <div className="header-row">
            <FaWallet className="login-icon" />
            <h3 className="app-title">Welcome Back</h3>
          </div>

          <h2 className="login-title">Login Now!</h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <p className="validation">{errors.name}</p>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="validation">{errors.email}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="validation">{errors.password}</p>
            )}

            <button type="submit" className="signin-btn">
              SIGN IN
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
