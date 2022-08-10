import React, { useContext, useEffect, useState } from "react";
import userContext from "../../Context/UserContext";
import "./home.css";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import Cookie from "universal-cookie";

const Home = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  const { deleteUser, getAllUser, setShowModal, showModal } = context;
  const [user, setUser] = useState([]);
  const [cookieData, setCookieData] = useState("");
  const getData = async () => {
    const res = await getAllUser();
    res && setUser(res);
  };
  const [id, setId] = useState("");
  const editModal = (id) => {
    setShowModal(!showModal);
    setId(id);
  };
  const deleteData = (id) => {
    deleteUser(id);
  };

  var cookie = new Cookie();
  //UseEffect
  useEffect(() => {
    getData();
  }, [user]);
  useEffect(() => {
    setCookieData(cookie.get("auth"));
  }, []);
  return (
    <>
      {cookieData ? (
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {user &&
                user.map((item, key) => (
                  <tr key={key}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <span
                        style={{ marginRight: "1rem", cursor: "pointer" }}
                        onClick={() => editModal(item._id)}
                      >
                        <BsPencilFill />
                      </span>
                      <span
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => deleteData(item._id)}
                      >
                        <BsTrashFill />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <EditModal id={id} />
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Home;
