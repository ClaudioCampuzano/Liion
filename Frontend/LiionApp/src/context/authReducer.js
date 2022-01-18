import {
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
  TRIGGER_RELOAD,
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
        fcmToken: payload.fcmToken,
        userData: { ...state.userData, ...payload.profile },
      };
    case LOGOUT_USER:
      return {
        ...state,
        uid: "",
        accesstoken: "",
        userData: {},
        fcmToken: '',
        travelStatus:'',
        isLoadedData: false,
      };
    case LOAD_FIRESTORE_DATA:
      return {
        ...state,
        uid: payload.uid,
        accesstoken: payload.atoken,
        fcmToken: payload.fcmToken,
        userData: { ...state.userData, ...payload.firestoreData },
        isLoadedData: true,
      };
    case GET_WHOLE_STATE:
      return state;
    case TRIGGER_RELOAD:
      return { ...state, reloadTrigger: payload };
    case REFRESHTOKENS:
      return { ...state, ...payload }
    case UPDATETRAVELSTATUS:
      return { ...state, travelStatus: payload }
    default:
      return state;
  }
};

export default authReducer;
