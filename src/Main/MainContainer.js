import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
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
      console.log('props === ', this.props)
      console.log('all events prop === ', this.props.allEvents)
      console.log('Events retrieved.', data.data);
    })
    .catch(error => {
      console.log('Error occurred.', error);
    });
  }

  render() {
    return (
      <Main {...this.props}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvents: addEvents
  }, dispatch);
}

// const mapStateToProps = (state) => {
//   const { username, allEvents } = state;
//
//   console.log('state ', state)
//   return {
//     username: username,
//     allEvents: allEvents
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    greetUser: () => {
      dispatch(setUserName());
    },
    addEvents: () => {
      dispatch(addEvents());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
