import React, { memo, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(confirmPassword);
  console.log(user);
  const onChange = (e) => {
    setUser((perk) => {
      return { ...perk, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = () => {
    if (user.password === confirmPassword) {
      axios
        .post("url", user)
        .then(({ data }) => {
          console.log(data);
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("please check the password");
    }
  };
  return (
    <div>
      <div className="register-main-div">
        <div className="register-body">
          <div>
            <label>Name</label>
            <input name="name" type="text" onChange={onChange} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" type="email" onChange={onChange} />
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" type="text" onChange={onChange} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" onChange={onChange} />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              name="name"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
