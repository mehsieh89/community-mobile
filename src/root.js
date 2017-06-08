import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store';
import Main from './Main/MainContainer';
import Login from './Login/LoginContainer';
import Loading from './Loading';
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
      Loading: { screen: Loading },
      Main: { screen: Main },
      Login: { screen: Login },
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
