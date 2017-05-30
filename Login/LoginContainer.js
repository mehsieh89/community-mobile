import React, { Component } from 'react';
// import setUserName from './homePageActions';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View,} from 'react-native';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    const { navigate } = this.props.navigation;
    navigate('HomePage');
  }

  render() {
    return (
      <View>
        <Text>Login please</Text>
        <Button title="Home Page" onPress={this.handlePress} />
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
