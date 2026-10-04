import axios from 'axios';
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/auth/login', { email, password }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, gender, college, mobile) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(
      '/api/auth/register',
      { name, email, password, gender, college, mobile },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get('/api/auth/profile', config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProfile = (name, email, gender, college, mobile) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userInfo.token,
    },
  };
  try {
    const { data } = await axios.put('/api/auth/profile', { name, email, gender, college, mobile }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error.response && error.response.data.message ? error.response.data.message : error.message;
  }
};

export const changePassword = (currentPassword, newPassword) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userInfo.token,
    },
  };
  try {
    const { data } = await axios.put('/api/auth/change-password', { currentPassword, newPassword }, config);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message ? error.response.data.message : error.message;
  }
};