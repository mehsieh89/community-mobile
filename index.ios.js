import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './src/HomePage/HomePageContainer';
import Login from './Login/LoginContainer';
import { StackNavigator, } from 'react-navigation';

class Root extends Component {
  render() {

    const RootNav = StackNavigator({
      Login: { screen: Login },
      HomePage: { screen: HomePage },
    });
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Community', () => Root);
