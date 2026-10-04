import {
  RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAIL,
  RESULT_DETAILS_REQUEST, RESULT_DETAILS_SUCCESS, RESULT_DETAILS_FAIL,
  RANKING_REQUEST, RANKING_SUCCESS, RANKING_FAIL,
} from '../constants/resultConstants';

export const resultListReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case RESULT_LIST_REQUEST: return { loading: true, results: [] };
    case RESULT_LIST_SUCCESS: return { loading: false, results: action.payload };
    case RESULT_LIST_FAIL: return { loading: false, error: action.payload };
    default: return state;
  }
};

export const resultDetailsReducer = (state = { result: {} }, action) => {
  switch (action.type) {
    case RESULT_DETAILS_REQUEST: return { loading: true, ...state };
    case RESULT_DETAILS_SUCCESS: return { loading: false, result: action.payload };
    case RESULT_DETAILS_FAIL: return { loading: false, error: action.payload };
    default: return state;
  }
};

export const rankingReducer = (state = { ranking: [] }, action) => {
  switch (action.type) {
    case RANKING_REQUEST: return { loading: true, ranking: [] };
    case RANKING_SUCCESS: return { loading: false, ranking: action.payload };
    case RANKING_FAIL: return { loading: false, error: action.payload };
    default: return state;
  }
};
