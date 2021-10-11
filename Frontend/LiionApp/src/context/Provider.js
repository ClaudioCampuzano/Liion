import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";

import authReducer from "./authReducer";
import { LOGOUT_USER, LOGIN_SUCCESS,RE_LOAD_USER_INFO } from "./types";

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
      } else throw res;
      return { state: true };
    } catch (err) {
      return { state: false, msg: err.message };
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

  const reLoadUserInfo = async (payload) => {
    
    try {
      const profile = {
        email: payload.email,
        emailVerified: payload.emailVerified,
        lastLoginAt: payload.lastLoginAt,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
      };
      const uid = payload.uid;
       authDispatch({
        type: LOGIN_SUCCESS,
        payload: { profile: profile, uid: uid },
       });
       //console.log(uid)
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        userData: state.userData,
        uid: state.uid,
        isLoggedIn: state.isLoggedIn,
        loginUser,
        logoutUser,
        reLoadUserInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
