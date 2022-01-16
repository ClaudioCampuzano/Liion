import React, { createContext, useReducer } from "react";
import { fireLogin, fireLogout } from "../firebase/Auth";
import { retrieveUserDataFromApi, upDateFcmToken } from "../api/api";
import { returnFcmToken } from "../utils/fcm";
import authReducer from "./authReducer";
import {
  LOGOUT_USER,
  LOGIN_SUCCESS,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  TRIGGER_RELOAD,
  REFRESHTOKENS,
  UPDATETRAVELSTATUS,
} from "./types";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  //travelStatus tendra tres valores '','soon','ongoing'
  const initialState = {
    uid: "",
    accesstoken: "",
    fcmToken: "",
    travelStatus:'',
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
    }
  };

  const loadUserFirestoreData = async (payload) => {
    try {
      const [flag, res] = await retrieveUserDataFromApi(payload);
      const profile = {
        emailVerified: payload.emailVerified,
        lastLoginAt: payload.metadata.lastLoginAt,
        createdAt: payload.metadata.createdAt,
      };
      const uid = payload.uid;
      const atoken = await payload.getIdToken(true);
      //Ojo es let porque despues la podria reasignas, con const no se puede en este tipo de datos (objetos si puedes modificar campos, pero no es un objeto)
      //mejor lo actualizamos siempre, por ahora      
      const fcmToken = await returnFcmToken();
      //console.log(fcmToken)
      const [flagFCM, resFCM] = await upDateFcmToken({ atoken: atoken, fcmToken: fcmToken, uid: uid })
      //copmo estamos dentro del try-catch.. basta con lanzar un error hacia afuera y paramos todo
      if (!flagFCM) throw "Error al registrar el FCM"
      //}

      if (flag) {
        authDispatch({
          type: LOAD_FIRESTORE_DATA,
          payload: {
            firestoreData: { ...res, ...profile },
            uid: uid,
            atoken: atoken,
            fcmToken: fcmToken,
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

  const updateTravelStatus = (payload) => {
    authDispatch({
      type:  UPDATETRAVELSTATUS,
      payload:payload
    })
  }

  const refreshTokens = (obj) => {
    const { accesstoken, fcmToken } = obj
    if (accesstoken) {
      authDispatch({
        type: REFRESHTOKENS,
        payload: { accesstoken: accesstoken }
      });
    }
    if (fcmToken) {
      authDispatch({
        type: REFRESHTOKENS,
        payload: { fcmToken: fcmToken }
      });
    };
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
        travelStatus: state.travelStatus,
        updateReloadTrigger,
        getState,
        loginUser,
        logoutUser,
        loadUserFirestoreData,
        refreshTokens,
        updateTravelStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
