import React, { Component } from 'react';
import Main from './MainComponent';
import { connect } from 'react-redux';

// const MainContainer = (props) => {
//   return (
//     <Main {...props}/>
//   );
// }

class MainContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Main {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  const { username } = state;

  return {
    username: username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    greetUser: () => {
      dispatch(setUserName());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
