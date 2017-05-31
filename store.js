import { createStore } from 'redux';
import mainReducer from './src/Main/MainReducer.js';

const store = createStore(rootReducer);

export default store;
