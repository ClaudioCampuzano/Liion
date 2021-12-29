import {
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  SET_IS_LOADED,
  TRIGGER_RELOAD,
} from "./types";

const authReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        uid: payload.uid,
        accesstoken: payload.atoken,
        userData: { ...state.userData, ...payload.profile },
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        uid: "",
        accesstoken: "",
        userData: {},
        isLoggedIn: false,
        isLoadedData: false,
      };

    case LOAD_FIRESTORE_DATA:
      return {
        ...state,
        uid: payload.uid,
        accesstoken: payload.atoken,
        userData: { ...state.userData, ...payload.firestoreData},
        isLoadedData: payload.isLoadedData
      };

    case GET_WHOLE_STATE:
      return state;

    case SET_IS_LOADED:
      return { ...state, isLoadedData: payload };

    case TRIGGER_RELOAD:
      return { ...state, reloadTrigger: payload };

    default:
      return state;
  }
};

export default authReducer;
