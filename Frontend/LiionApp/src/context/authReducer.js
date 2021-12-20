import {
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  SET_IS_LOADED,
  TRIGGER_RELOAD
} from "./types";

const authReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: {...state.userData, ...payload.profile},
        uid: payload.uid,
        accesstoken: payload.atoken,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userData: {},
        uid: "",
      };
    case LOAD_FIRESTORE_DATA:
      return {
        ...state,
        userData: {...state.userData, ...payload},
      };
    case GET_WHOLE_STATE:
      return state;
    case SET_IS_LOADED:
      return { ...state, isLoadedDATA: payload };
    case TRIGGER_RELOAD:
      return {...state, reloadTrigger:payload}

    default:
      return state;
  }
};

export default authReducer;
