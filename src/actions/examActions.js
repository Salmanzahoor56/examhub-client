import axios from 'axios';
import {
  EXAM_LIST_REQUEST, EXAM_LIST_SUCCESS, EXAM_LIST_FAIL,
  EXAM_DETAILS_REQUEST, EXAM_DETAILS_SUCCESS, EXAM_DETAILS_FAIL,
  EXAM_TAKE_REQUEST, EXAM_TAKE_SUCCESS, EXAM_TAKE_FAIL,
} from '../constants/examConstants';

const API = (import.meta.env.VITE_API_URL || '') + '/api';

export const listExams = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/exams', config);
    dispatch({ type: EXAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXAM_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getExamDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/exams/' + id, config);
    dispatch({ type: EXAM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXAM_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const takeExam = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_TAKE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
    const { data } = await axios.get(API + '/exams/' + id + '/take', config);
    dispatch({ type: EXAM_TAKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXAM_TAKE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const submitExam = (id, answers, startedAt) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + userInfo.token },
  };
  const { data } = await axios.post(API + '/exams/' + id + '/submit', { answers, startedAt }, config);
  return data;
};
