import { LOGIN_SUCCESS, LOGOUT_USER } from "./types";

const authReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: payload.profile,
        uid: payload.uid,      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        uid: "",
      };
    default:
      return state;
  }
};

export default authReducer;
