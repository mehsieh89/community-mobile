import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Main from './MainComponent';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { addEvents } from './mainActions';
import { toggleCreateEvent } from './CreateEvent/createEventActions';
import Fade from '../Loading/Fade';

const baseUrl = 'https://warriors-community.herokuapp.com';

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
    const ScreenHeight = Dimensions.get("window").height;
    const ScreenWidth = Dimensions.get("window").width;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Fade style={{width: ScreenWidth, height: ScreenHeight, backgroundColor: 'powderblue'}}>
          <Main {...this.props} />
        </Fade>
      </View>
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
