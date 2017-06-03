import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Main from './MainComponent';
import { addEvents } from './mainActions';
import toggleCreateEvent from './CreateEvent/createEventActions';

class MainContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/retrieveEvents')
    .then(data => {
      this.props.addEvents(data.data);
      console.log('Events retrieved.', data.data);
    })
    .catch(error => {
      console.log('Error occurred.', error);
    });
  }

  render() {
    return (
      <Main allEvents={this.props.allEvents} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvents: addEvents,
    toggleCreateEvent: toggleCreateEvent
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { allEvents, createEventReducer } = state;

  return {
    allEvents: allEvents,
    createEventReducer: createEventReducer
  };

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
