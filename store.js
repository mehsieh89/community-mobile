import { createStore } from 'redux';
import mainReducer from './src/Main/mainReducer.js';
import loginReducer from './src/Login/loginReducer';
import { combineReducers } from 'redux';
import mapReducer from './src/Main/Map/mapReducer';

const allReducers = combineReducers({
  mainReducer: mainReducer,
  loginReducer: loginReducer,
  mapReducer: mapReducer
});

const store = createStore(allReducers);

export default store;
