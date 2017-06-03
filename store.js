import { createStore } from 'redux';
import { combineReducers } from 'redux';
import mainReducer from './src/Main/mainReducer.js';
import loginReducer from './src/Login/loginReducer';
import mapReducer from './src/Main/Map/mapReducer';
import createEventReducer from './src/Main/CreateEvent/createEventReducer';

const allReducers = combineReducers({
  mainReducer: mainReducer,
  loginReducer: loginReducer,
  mapReducer: mapReducer,
  createEventReducer: createEventReducer
});

const store = createStore(allReducers);

export default store;
