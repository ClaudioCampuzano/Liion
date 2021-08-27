import React, { createContext, useReducer } from "react";

import authReducer from "./authReducer";


export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
    token: "",
  };
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
