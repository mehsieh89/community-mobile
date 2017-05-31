import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './src/HomePage/HomePageContainer';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Community', () => Root);
