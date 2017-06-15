import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import updateCurrentUser from '../Login//loginActions';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const baseUrl = 'https://warriors-community.herokuapp.com';

class LoadingComponent extends Component {

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (!data || !data.accessToken) {
        this.props.navigation.navigate('Login');
      } else {
        const { accessToken } = data;
        const infoRequest = new GraphRequest(
          '/me?fields=email,name,picture.type(large)',
          { accessToken: accessToken },
          this._responseInfoCallback.bind(this),
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    })
    .catch(err => { console.log(err); });
  }

  handleLoginSuccess(data) {
    const { navigate } = this.props.navigation;
    navigate('Main');
    this.props.updateCurrentUser(data);
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) { console.log('Error fetching data: ', error);
    } else {
      const context = this;
      axios.post(baseUrl + '/mobileFBLogin', result)
      .then(function (response) {
        context.handleLoginSuccess = context.handleLoginSuccess.bind(context);
        context.handleLoginSuccess(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Image
          source={require('../../assets/penguin-icon.png')}
          style={{height: 200, marginBottom: 20}}
         />
        <ActivityIndicator
          animating={true}
          color='#31575B'
          size="large"
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent);
