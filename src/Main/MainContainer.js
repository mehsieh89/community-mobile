import React, { Component } from 'react';
import setUserName from './mainActions';
import { connect } from 'react-redux';

import Main from './MainComponent';

const MainContainer = (props) => {
  return (
    <Main {...props} />
  );
};

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
