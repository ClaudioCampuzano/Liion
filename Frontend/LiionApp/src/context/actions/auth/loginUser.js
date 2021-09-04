import { LOGIN_LOADING } from '../../../constants/actionTypes/types'
import { fireLogin } from "../../../firebase/Auth";

export default (payload) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
      });
      fireLogin(payload)
}