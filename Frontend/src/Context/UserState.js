import React from "react";
import UserContext from "./UserContext";
const UserState = (props) => {
  return (
    <UserContext.Provider value={{}}>{props.children}</UserContext.Provider>
  );
};

export default UserState;
