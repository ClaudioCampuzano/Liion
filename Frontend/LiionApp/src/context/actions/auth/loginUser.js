import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from "../../../actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default ({ }) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
      });
}