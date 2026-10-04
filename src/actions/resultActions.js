import axios from 'axios';
import {
  RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAIL,
  RESULT_DETAILS_REQUEST, RESULT_DETAILS_SUCCESS, RESULT_DETAILS_FAIL,
  RANKING_REQUEST, RANKING_SUCCESS, RANKING_FAIL,
} from '../constants/resultConstants';

const API = (import.meta.env.VITE_API_URL || '') + '/api';

export const listMyResults = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RESULT_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/results/my-results', config);
    dispatch({ type: RESULT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESULT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getResultDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESULT_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/results/' + id, config);
    dispatch({ type: RESULT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESULT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getRanking = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RANKING_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/results/ranking', config);
    dispatch({ type: RANKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RANKING_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
