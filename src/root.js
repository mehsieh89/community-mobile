import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store';
import Main from './Main/MainContainer';
import Login from './Login/LoginContainer';
import { StackNavigator } from 'react-navigation';

// uncomment this to hide simulator warnings
// console.disableYellowBox = true;

class Root extends Component {
  render() {
    const RootNav = StackNavigator({
      Login: { screen: Login },
      Main: { screen: Main },
    });

    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}

export default Root;
