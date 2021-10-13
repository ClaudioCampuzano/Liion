import {
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOAD_FIRESTORE_DATA,
  GET_WHOLE_STATE,
} from "./types";

const authReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: payload.profile,
        uid: payload.uid,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        uid: "",
      };
    case LOAD_FIRESTORE_DATA:
      return {
        ...state,
        userFirestoreData: payload,
      };
    case GET_WHOLE_STATE:
      
      return state;
    default:
      return state;
  }
};

export default authReducer;
