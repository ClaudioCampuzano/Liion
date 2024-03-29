import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";
import { getUserData, updateExpoToken } from "../api/api";
import registerForPushNotificationsAsync from "../notifications/notifications";
import * as Notifications from "expo-notifications";

import authReducer from "./authReducer";
import {
  LOGOUT_USER,
  LOGIN_SUCCESS,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  TRIGGER_RELOAD,
  SETNOTIFICATION,
  REFRESHTOKENS,
  UPDATETRAVELSTATUS,
} from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const initialState = {
    uid: "",
    accesstoken: "",
    userData: {},
    isLoadedData: false,
    reloadTrigger: false,
    travelStatus: "",
    notification: false,
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
        const expoToken = await registerForPushNotificationsAsync(
          Notifications
        );

        const tokenUpdate = {
          atoken: atoken,
          expoToken: expoToken,
          uid: uid,
        };
        await updateExpoToken(tokenUpdate);

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
      console.log(err);
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

  const updateTravelStatus = (payload) => {
    authDispatch({
      type: UPDATETRAVELSTATUS,
      payload: payload,
    });
  };

  const refreshTokens = (obj) => {
    const { accesstoken } = obj;
    if (accesstoken) {
      authDispatch({
        type: REFRESHTOKENS,
        payload: { accesstoken: accesstoken },
      });
    }
  };
  const setNotificationF = (notif) => {
    authDispatch({
      type: SETNOTIFICATION,
      payload: notif,
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
        notification: state.notification,
        travelStatus: state.travelStatus,
        updateReloadTrigger,
        getState,
        loginUser,
        logoutUser,
        loadUserFirestoreData,
        setNotificationF,
        refreshTokens,
        updateTravelStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
