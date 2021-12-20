import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";
import { retrieveUserDataFromApi, updateDriverStatus } from "../api/api";

import authReducer from "./authReducer";
import {
  LOGOUT_USER,
  LOGIN_SUCCESS,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  SET_IS_LOADED,
  TRIGGER_RELOAD,
} from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    uid: "",
    accesstoken: "",
    userData: {},
    isLoggedIn: false,
    isLoadedDATA: false,
    reloadTrigger: false,
  };
  const [state, authDispatch] = useReducer(authReducer, initialState);

  const loginUser = async (payload) => {
    try {
      const res = await fireLogin(payload);

      if (res.hasOwnProperty("user")) {
        const profile = {
          emailVerified: res.user.emailVerified,
          lastLoginAt: res.user.metadata.lastLoginAt,
          createdAt: res.user.metadata.createdAt          
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
        emailVerified: payload.emailVerified,
        lastLoginAt: payload.metadata.lastLoginAt,
        createdAt: payload.metadata.createdAt
      };
      const uid = payload.uid;
      const atoken = await payload.getIdToken(true);

      authDispatch({
        type: LOGIN_SUCCESS,
        payload: { profile: profile, uid: uid, atoken: atoken },
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  const loadUserFirestoreData = async (user) => {
    const [flag, res] = await retrieveUserDataFromApi(user);
    //console.log(res)
    if (flag) {
      //update estado
      authDispatch({
        type: LOAD_FIRESTORE_DATA,
        payload: res,
      });
      return true;
    } else {
      //console.log(res);
      return false;
      //nada, error no pudo actualizar datos
    }
  };

  const getState =  () => {
    const data = authDispatch({ type: GET_WHOLE_STATE });
    return data;
  };

  const setIsLoadedDATA = async (load) => {
    authDispatch({
      type: SET_IS_LOADED,
      payload: load,
    });
  };

  
  const updateReloadTrigger = (actualTrigger) => {
    authDispatch({
      type: TRIGGER_RELOAD,
      payload: actualTrigger,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        uid: state.uid,
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        getState2: state,
        accesstoken: state.accesstoken,
        isLoadedDATA: state.isLoadedDATA,
        reloadTrigger: state.reloadTrigger,
        updateReloadTrigger,
        setIsLoadedDATA,
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
