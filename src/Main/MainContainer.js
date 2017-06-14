import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Main from './MainComponent';
import { connect } from 'react-redux';
import axios from 'axios';
import { addEvents } from './mainActions';
import { toggleCreateEvent } from './CreateEvent/createEventActions';
const baseUrl = 'http://localhost:3000';

class MainContainer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(baseUrl + '/api/retrieveEvents')
    .then(res => {
      this.props.addEvents(res.data);
    })
    .catch(error => {
      console.log('Error occurred.', error);
    });
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvents: addEvents,
    toggleCreateEvent: toggleCreateEvent,
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { allEvents, createEventReducer } = state;

  return {
    allEvents: allEvents,
    createEventReducer: createEventReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
