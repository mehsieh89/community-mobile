import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Main from './MainComponent';
import { connect } from 'react-redux';
import axios from 'axios';
import { addEvents } from './mainActions';

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
    addEvents: addEvents
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { allEvents } = state;

  return {
    allEvents: allEvents
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
