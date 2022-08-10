import React, { useState, useContext } from "react";
import contextData from "../../Context/UserContext";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const context = useContext(contextData);
  const { loginUser } = context;
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setUser((perk) => {
      return { ...perk, [e.target.name]: e.target.value };
    });
  };
  const [submit, setSubmit] = useState(false);
  const onSubmit = async () => {
    if (!submit) {
      setFormErrors(validate(user));
    } else {
      const res = await loginUser(user);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    setSubmit(true);

    return errors;
  };
  return (
    <div>
      <div className="login-main-div">
        <div className="login-body">
          <h2>Login</h2>
          <div>
            <label>Email</label>
            <input type="test " onChange={onChange} name="email" />
          </div>
          <p className="validationClass">{formErrors.email}</p>
          <div>
            <label>Password</label>
            <input type="test " onChange={onChange} name="password" />
          </div>
          <p className="validationClass">{formErrors.password}</p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Not yet Registered ?
          </div>

          <button className="login-register-button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
