import React, { Component } from 'react';
import FBSDK from 'react-native-fbsdk';
import { Button, StyleSheet, Text, View} from 'react-native';


class FBLogin extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(error, result) {
    if (error) { alert("Login failed with error: " + result.error); }
    else if (result.isCancelled) { alert("Login was cancelled"); }
    else {
      console.log(result);
      alert("Login was successful with permissions: " + result.grantedPermissions);
    }
  }

  render() {
    const { LoginButton } = FBSDK;
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={this.handleLogin}
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

export default FBLogin;

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginManager,
// } = FBSDK;
//
// // ...
//
// // Attempt a login using the Facebook login dialog,
// // asking for default permissions.
// LoginManager.logInWithReadPermissions(['public_profile']).then(
//   function(result) {
//     if (result.isCancelled) {
//       alert('Login was cancelled');
//     } else {
//       alert('Login was successful with permissions: '
//         + result.grantedPermissions.toString());
//     }
//   },
//   function(error) {
//     alert('Login failed with error: ' + error);
//   }
// );
