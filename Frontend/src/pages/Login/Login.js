import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
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
  const onSubmit = () => {
    axios
      .post("url", user)
      .then(({ data }) => {
        console.log(data);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="login-main-div">
        <div className="login-body">
          <div>
            <label>Email</label>
            <input type="test " onChange={onChange} name="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="test " onChange={onChange} name="password" />
          </div>
          <div onClick={() => navigate("/register")}>Not yet Registered ?</div>
          <button className="login-register-button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
