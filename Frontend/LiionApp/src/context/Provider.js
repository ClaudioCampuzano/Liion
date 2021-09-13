import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";

import authReducer from "./authReducer";
import { LOGOUT_USER, LOGIN_SUCCESS } from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
    uid: "",
  };
  const [state, authDispatch] = useReducer(authReducer, initialState);

  const loginUser = async (payload) => {
    try {
      const res = await fireLogin(payload);

      if (res.hasOwnProperty("user")) {
        const profile = {
          email: res.user.email,
          emailVerified: res.user.emailVerified,
          lastLoginAt: res.user.lastLoginAt,
          phoneNumber: res.user.phoneNumber,
          photoURL: res.user.photoURL,
        };
        const uid = res.user.uid;
        authDispatch({
          type: LOGIN_SUCCESS,
          payload: { profile: profile, uid: uid },
        });
      } else console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fireLogout();
      authDispatch({ type: LOGOUT_USER });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged: state.isLoggedIn,
        userData: state.userData,
        token: state.token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
