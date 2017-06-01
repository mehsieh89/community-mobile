import React, { Component } from 'react';
// import setUserName from './homePageActions';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import FBLogin from './FBLogin';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSkip = this.handleSkip.bind(this);
  }

  handleSkip(e) {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button title="Skip Login" onPress={this.handleSkip} />
        <FBLogin />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { username } = state;
  return {
    //username: username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // greetUser: () => {
    //   dispatch(setUserName());
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
