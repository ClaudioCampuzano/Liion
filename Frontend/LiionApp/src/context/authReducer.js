import {
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  TRIGGER_RELOAD,
  SETEXPOPUSHTOKEN,
  SETNOTIFICATION,
  REFRESHTOKENS,
  UPDATETRAVELSTATUS,
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
      };
    case LOGOUT_USER:
      return {
        ...state,
        uid: "",
        accesstoken: "",
        userData: {},
        isLoadedData: false,
        travelStatus: "",
        expoPushToken: "",
        notification: false,
      };
    case LOAD_FIRESTORE_DATA:
      return {
        ...state,
        uid: payload.uid,
        accesstoken: payload.atoken,
        userData: { ...state.userData, ...payload.firestoreData },
        isLoadedData: true,
      };
    case GET_WHOLE_STATE:
      return state;
    case TRIGGER_RELOAD:
      return { ...state, reloadTrigger: payload };
    case SETEXPOPUSHTOKEN:
      return { ...state, expoPushToken: payload };
    case SETNOTIFICATION:
      return { ...state, notification: payload };
    case REFRESHTOKENS:
      return { ...state, ...payload };
    case UPDATETRAVELSTATUS:
      console.log(payload)
      return { ...state, travelStatus: payload };
    default:
      return state;
  }
};

export default authReducer;
