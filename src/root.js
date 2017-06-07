import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store';
import Main from './Main/MainContainer';
import Login from './Login/LoginContainer';
import { StackNavigator } from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

// uncomment this to hide simulator warnings
console.disableYellowBox = true;

const uiTheme = {
  palette: {
    primaryColor: '#fff',
  },
  toolbar: {
    container: {
      height: 40,
      width: 350
    },
  },
};

class Root extends Component {
  render() {
    const RootNav = StackNavigator({
      Login: { screen: Login },
      Main: { screen: Main }
    });

    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <RootNav />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Root;
