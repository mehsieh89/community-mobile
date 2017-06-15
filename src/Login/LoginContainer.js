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
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handleLoginSuccess(data) {
    const { navigate } = this.props.navigation;
    navigate('Main');
    this.props.updateCurrentUser(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/penguin-icon.png')}
          style={{height: 200}}
         />
        <Text style={styles.welcome}>Community</Text>
        <FBLogin handleLoginSuccess={this.handleLoginSuccess}/>
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
    fontSize: 40,
    fontFamily: 'Vibur',
    textAlign: 'center',
    margin: 10,
    marginBottom: 10,
    marginTop: 10
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
