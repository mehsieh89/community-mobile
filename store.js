import { createStore } from 'redux';
import { combineReducers } from 'redux';
import mainReducer from './src/Main/mainReducer.js';
import loginReducer from './src/Login/loginReducer';
import mapReducer from './src/Main/Map/mapReducer';
import createEventReducer from './src/Main/CreateEvent/createEventReducer';
import eventDetailsReducer from './src/Main/EventDetails/eventDetailsReducer';
import drawerReducer from './src/Main/Map/Drawer/drawerReducer';
import drawerReducerEL from './src/Main/EventList/Drawer/drawerReducer';

const allReducers = combineReducers({
  mainReducer: mainReducer,
  loginReducer: loginReducer,
  mapReducer: mapReducer,
  createEventReducer: createEventReducer,
  eventDetailsReducer: eventDetailsReducer,
  drawerReducer: drawerReducer,
  drawerReducerEL: drawerReducerEL
});

const store = createStore(allReducers);

export default store;
