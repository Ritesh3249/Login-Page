import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
const UserState = (props) => {
  const navigate = useNavigate();
  const loginUser = (data) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_DATA}/api/login`, data, {
        withCredentials: true,
      })
      .then(({ data }) => {
        navigate("/users");

        toast.success(data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((data) => {
        toast.warning(data.response.data[0].msg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const createUser = (data) => {
    return axios
      .post(
        `${process.env.REACT_APP_BACKEND_DATA}/api/createuser`,
        data,

        { withCredentials: true }
      )
      .then(({ data }) => {
        navigate("/users");
        toast.success(data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return data;
      })
      .catch((data) => {
        toast.warning(data.response.data.error[0].msg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const updateUser = (data, id) => {
    return axios
      .put(
        `${process.env.REACT_APP_BACKEND_DATA}/api/update-user/${id}`,
        data,
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        toast.success(data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((data) => {
        toast.warning(data.response.data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const deleteUser = (id) => {
    return axios
      .delete(
        `${process.env.REACT_APP_BACKEND_DATA}/api/delete-user/${id}`,

        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        toast.success(data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((data) => {
        toast.warning(data.response.data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const getAllUser = (data) => {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_DATA}/api/get-all-users`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        return data;
      })
      .catch(({ data }) => {
        toast.warning(data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <UserContext.Provider
      value={{
        getAllUser,
        loginUser,
        deleteUser,
        updateUser,
        createUser,
        showModal,
        setShowModal,
      }}
    >
      <ToastContainer />
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
