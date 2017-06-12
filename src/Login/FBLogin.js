import React, { Component } from 'react';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import { Button, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

class FBLogin extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
  }

  handleLogin(error, result) {
    if (error) { console.log("Login failed with error: ", result.error); }
    else if (result.isCancelled) { console.log("Login was cancelled"); }
    else {
      AccessToken.getCurrentAccessToken()
      .then((data) => {
        const { accessToken } = data;
        const infoRequest = new GraphRequest(
          '/me?fields=email,name,picture.type(large)',
          { accessToken: accessToken },
          this._responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) { console.log('Error fetching data: ', error);
    } else {
      const context = this;

      axios.post(baseUrl + '/mobileFBLogin', result)
      .then(function (response) {
        console.log(response.data);
        context.props.handleLoginSuccess(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
