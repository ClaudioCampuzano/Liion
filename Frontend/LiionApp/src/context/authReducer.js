import {
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_SUCCESS,
} from '../constants/actionTypes/types';

const authReducer = (state, action) => {
  const { payload, type } = action;

    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          userData: payload,
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          userData: payload,
          isLoggedIn: true,
          token:''
        };
  
      case LOGOUT_USER:
        return {
          ...state,
          userData: null,
          isLoggedIn: false,
          token:''
        };
      default:
        return state;
    }
  };
  
  export default authReducer;