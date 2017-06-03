import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateCurrentUser from './loginActions';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import FBLogin from './FBLogin';

class LoginContainer extends Component {

  static navigationOptions = { header: null };

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

    console.log('handleLoginSuccess ~~~~~~~~~~~~~~~~~')
    this.props.updateCurrentUser(data);
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/community-login.png')}
          style={{height: 150}}
         />
        <Text style={styles.welcome}>Welcome to Community</Text>
        <FBLogin handleLoginSuccess={this.handleLoginSuccess}/>
        <Button title="Skip Login" onPress={this.handleSkip} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 30
  },
  skip: {
    fontSize: 5,
  }
});

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
