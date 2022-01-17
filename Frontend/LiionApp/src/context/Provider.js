import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";
import { getUserData } from "../api/api";

import authReducer from "./authReducer";
import {
  LOGOUT_USER,
  LOGIN_SUCCESS,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  TRIGGER_RELOAD,
} from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    uid: "",
    accesstoken: "",
    userData: {},
    isLoadedData: false,
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
          createdAt: res.user.metadata.createdAt,
        };
        const uid = res.user.uid;
        const atoken = await res.user.getIdToken(true);

        authDispatch({
          type: LOGIN_SUCCESS,
          payload: { profile: profile, uid: uid, atoken: atoken },
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

  const loadUserFirestoreData = async (payload) => {
    try {
      const [flag, res] = await getUserData(payload);
      const profile = {
        emailVerified: payload.emailVerified,
        lastLoginAt: payload.metadata.lastLoginAt,
        createdAt: payload.metadata.createdAt,
      };
      const uid = payload.uid;
      const atoken = await payload.getIdToken(true);
      if (flag) {
        authDispatch({
          type: LOAD_FIRESTORE_DATA,
          payload: {
            firestoreData: { ...res, ...profile },
            uid: uid,
            atoken: atoken,
          },
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getState = () => {
    const data = authDispatch({ type: GET_WHOLE_STATE });
    return data;
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
        userData: state.userData,
        getState2: state,
        accesstoken: state.accesstoken,
        isLoadedData: state.isLoadedData,
        reloadTrigger: state.reloadTrigger,
        updateReloadTrigger,
        getState,
        loginUser,
        logoutUser,
        loadUserFirestoreData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
