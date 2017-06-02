import React, { Component } from 'react';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton, LoginManager } from 'react-native-fbsdk';
import { Button, StyleSheet, Text, View} from 'react-native';

class FBLogin extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(error, result) {
    if (error) { console.log("Login failed with error: ", result.error); }
    else if (result.isCancelled) { console.log("Login was cancelled"); }
    else {
      console.log("Login was successful with permissions: ", result.grantedPermissions);
      AccessToken.getCurrentAccessToken()
      .then((data) => {
        const { accessToken } = data;
        const infoRequest = new GraphRequest(
          '/me',
          null,
          this._responseInfoCallback,
        );
        const anotherInfoRequest = new GraphRequest(
          '/me?fields=email',
          { accessToken: accessToken },
          this._responseInfoCallback,
        );
        new GraphRequestManager().addRequest(anotherInfoRequest).start();
      });
    }
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) { console.log('Error fetching data: ', error); }
    else { console.log('Success fetching data: ', result); }
  }

  render() {
    return (
      <View>
        <LoginButton
          //publishPermissions={["publish_actions"]}
          readPermissions={["email", "public_profile"]}
          onLoginFinished={this.handleLogin}
          onLogoutFinished={() => console.log("User logged out")}/>
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
