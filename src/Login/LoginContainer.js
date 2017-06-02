import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateCurrentUser from './loginActions';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import FBLogin from './FBLogin';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handleSkip(e) {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  handleLoginSuccess(data) {
    this.props.updateCurrentUser(data);
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button title="Skip Login" onPress={this.handleSkip} />
        <FBLogin handleLoginSuccess={this.handleLoginSuccess}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginReducer } = state;
  return {
    loginReducer: loginReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCurrentUser: updateCurrentUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
