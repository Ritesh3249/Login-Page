import React, { memo, useState, useContext } from "react";
import contextData from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
const Register = () => {
  const navigate = useNavigate();
  const context = useContext(contextData);
  const { createUser } = context;
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

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
      if (user.password === confirmPassword) {
        const res = await createUser(user);
      } else {
        toast.warning("please check the password", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    setSubmit(true);

    return errors;
  };
  return (
    <div>
      <div className="register-main-div">
        <div className="register-body">
          <h2>Register</h2>
          <div>
            <label>Name</label>
            <input name="name" type="text" onChange={onChange} />
          </div>
          <p className="validationClass">{formErrors.name}</p>
          <div>
            <label>Email</label>
            <input name="email" type="email" onChange={onChange} />
          </div>
          <p className="validationClass">{formErrors.email}</p>
          <div>
            <label>Phone</label>
            <input name="phone" type="text" onChange={onChange} />
          </div>
          <p className="validationClass">{formErrors.phone}</p>
          <div>
            <label>Password</label>
            <input name="password" type="password" onChange={onChange} />
          </div>
          <p className="validationClass">{formErrors.password}</p>
          <div>
            <label>Confirm Password</label>
            <input
              name="name"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="validationClass">{formErrors.confirmPassword}</p>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Log In?
          </div>
          <button onClick={onSubmit} className="login-register-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Register);
