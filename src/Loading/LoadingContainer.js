import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateCurrentUser from '../Login/loginActions';
import Loading from './LoadingComponent';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';

class LoadingContainer extends Component {

  static navigationOptions = { header: null };

  render() {
    return (
      <Loading navigation={this.props.navigation} />
    );
  }
}

export default LoadingContainer;
