// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from 'reducers/authReducer';
import todoReducer from 'reducers/todoReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
});

export default rootReducer;
