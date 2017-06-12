import React, { Component } from 'react';
import Loading from './LoadingComponent';

class LoadingContainer extends Component {

  static navigationOptions = { header: null };

  render() {
    return (
      <Loading navigation={this.props.navigation} />
    );
  }
}

export default LoadingContainer;
