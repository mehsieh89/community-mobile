import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';

class Loading extends Component {

  static navigationOptions = { header: null };

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (!data || !data.accessToken) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Main');
      }
    })
    .catch(err => { console.log(err); });
  }

  render() {
    return (
      <View style={{ marginTop: 300, alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>Loading...</Text>
      </View>
    );
  }
}

export default Loading;
