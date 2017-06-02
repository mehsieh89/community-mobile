import { createStore } from 'redux';
import mainReducer from './src/Main/mainReducer.js';
import loginReducer from './src/Login/loginReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  mainReducer: mainReducer,
  loginReducer: loginReducer,
});

const store = createStore(allReducers);

export default store;
