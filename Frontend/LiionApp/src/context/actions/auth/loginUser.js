import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from '../../../constants/actionTypes/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireLogin } from "../../../firebase/Auth";

export default (payload) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
      });
      //console.log(payload)
      fireLogin(payload)
}