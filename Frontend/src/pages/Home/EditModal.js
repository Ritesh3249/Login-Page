import React, { useContext, memo, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { Button, Modal, ModalTitle, Card } from "react-bootstrap";
import "./editModal.css";
const EditModal = ({ id }) => {
  const context = useContext(UserContext);
  const { setShowModal, updateUser, showModal } = context;
  console.log(id);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(user);
  const onChange = (e) => {
    setUser((perk) => {
      return { ...perk, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async () => {
    if (user.password === confirmPassword) {
      const res = await updateUser(user, id);
      console.log(res);
      setShowModal(false);
      console.log(res);
    } else {
      alert("please check the password");
    }
  };
  return (
    <div>
      <Modal show={showModal} size="lg">
        <Modal.Header>
          <ModalTitle>Legal Progress details</ModalTitle>
          <Button
            onClick={() => setShowModal(false)}
            // className="btn-close"
            variant=""
          >
            x
          </Button>
        </Modal.Header>
        <Card>
          <div className="modal-body">
            <h2>Register</h2>
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
        </Card>
      </Modal>
    </div>
  );
};

export default memo(EditModal);
