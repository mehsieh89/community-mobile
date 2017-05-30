import React, { Component } from 'react';
import setUserName from './homePageActions';
import { connect } from 'react-redux';

import HomePage from './HomePageComponent';

const HomePageContainer = (props) => {
  return (
    <HomePage {...props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
