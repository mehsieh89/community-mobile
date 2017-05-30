import { createStore } from 'redux';
import rootReducer from './HomePage/homePageReducer.js';

const store = createStore(rootReducer);

export default store;
