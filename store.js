import { createStore } from 'redux';
import rootReducer from './src/HomePage/homePageReducer.js';

const store = createStore(rootReducer);

export default store;
