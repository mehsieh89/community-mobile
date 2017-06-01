import { createStore } from 'redux';
import mainReducer from './src/Main/mainReducer.js';

const store = createStore(mainReducer);

export default store;
