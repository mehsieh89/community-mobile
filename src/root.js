import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store';
import Main from './Main/MainContainer';
import Login from './Login/LoginContainer';
import Loading from './Loading/LoadingContainer';
import UserProfile from './UserProfile/UserProfileContainer';
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

const FadeTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  return {
    opacity
  };
};

const TransitionConfiguration = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const {position, scene} = sceneProps;
      const {index, route} = scene;
      return FadeTransition(index, position);
    }
  }
};

class Root extends Component {
  render() {
    const RootNav = StackNavigator({
      Loading: { screen: Loading },
      Main: { screen: Main },
      Login: { screen: Login },
      UserProfile: { screen: UserProfile }
    },
    {
      transitionConfig: TransitionConfiguration
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
