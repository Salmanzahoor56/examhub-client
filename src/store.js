import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './reducers/userReducers';
import { examListReducer, examDetailsReducer, examTakeReducer } from './reducers/examReducers';
import { resultListReducer, resultDetailsReducer, rankingReducer } from './reducers/resultReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  examList: examListReducer,
  examDetails: examDetailsReducer,
  examTake: examTakeReducer,
  resultList: resultListReducer,
  resultDetails: resultDetailsReducer,
  ranking: rankingReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
