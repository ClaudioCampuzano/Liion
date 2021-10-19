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
  TRIGGER_RELOAD
} from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    isLoadedDATA: false,
    userData: {},
    uid: "",
    userFirestoreData: {},
    accesstoken: "",
    reloadTrigger:false,
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

  const getState = async () => {
    const data = authDispatch({ type: GET_WHOLE_STATE });
    return data;
  };

  const setIsLoadedDATA = async (load) => {
    //console.log(load)
    authDispatch({
      type: SET_IS_LOADED,
      payload: load,
    });
  };

  const updateDriverApicall = async (flag, payload) => {
    const [result, res] = await updateDriverStatus(flag, payload)
    //console.log(result, res)
    return( [result, res])
  }
  const updateReloadTrigger = async (actualTrigger) => {
    authDispatch({
      type:TRIGGER_RELOAD,
      payload:actualTrigger
    })

  }

  return (
    <GlobalContext.Provider
      value={{
        userData: state.userData,
        uid: state.uid,
        isLoggedIn: state.isLoggedIn,
        userFirestoreData: state.userFirestoreData,
        getState2: state,
        accesstoken: state.accesstoken,
        isLoadedDATA: state.isLoadedDATA,
        reloadTrigger: state.reloadTrigger,
        updateReloadTrigger,
        updateDriverApicall,
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
