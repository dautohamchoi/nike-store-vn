import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstant';

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password}})
  try {
    const { data } = await axios.post("/api/users/signin", { email, password});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { data } });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
  }
}

const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password }});
  try {
    const { data } = await axios.post("/api/users/signup", { name, email, password });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: { data }});
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message })
  }
}

const logout = () => (dispatch) => {
  Cookie.remove('userInfo');
  dispatch({ type: USER_LOGOUT })
}

const update = ({ userId, name, password }) => async (dispatch, getState) => {
  const { userSignin : { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, password } });
  try {
    const { data } = await axios.put('/api/users/' + userId, 
      { name, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }}
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message })
  }
}

export { signin, signup, logout, update };