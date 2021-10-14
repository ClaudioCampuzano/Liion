import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";
import { retrieveUserDataFromApi } from "../api/api";

import authReducer from "./authReducer";
import { LOGOUT_USER, LOGIN_SUCCESS, LOAD_FIRESTORE_DATA, GET_WHOLE_STATE } from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
    uid: "",
    userFirestoreData: {},
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
      
      return true;
    } catch (err) {
      return false;
    }
  };

  const loadUserFirestoreData = async (user) => {
    const [flag, res] = await retrieveUserDataFromApi(user);
    if (flag) {
      
      //update estado
      authDispatch({
        type:LOAD_FIRESTORE_DATA,
        payload:res
      });
      return true;
    } else {
      console.log(res);
      return false;
      //nada, error no pudo actualizar datos
    }
  };

  const getState = async () => {
    const data = authDispatch({type:GET_WHOLE_STATE});
    return data;
  }

  return (
    <GlobalContext.Provider
      value={{
        userData: state.userData,
        uid: state.uid,
        isLoggedIn: state.isLoggedIn,
        userFirestoreData: state.userFirestoreData,
        getState2:state,
        getState,
        loginUser,
        logoutUser,
        reLoadUserInfo,
        loadUserFirestoreData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
