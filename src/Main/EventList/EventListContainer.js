import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentEvent, updateButton, setCurrentEventParticipants } from './../EventDetails/eventDetailsActions';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import EventListComponent from './EventListComponent';
import { toggleELDrawer } from './Drawer/drawerActions';
import { addEvents } from '../mainActions';

class EventListContainer extends Component{

  static navigationOptions = { header: null }

  onEventClick = (index) => {
    this.props.setCurrentEvent(index);
    const { navigate } = this.props.navigation;
    navigate('EventDetails');
  }

  render() {
    return (
      <View>
        <EventListComponent
          {...this.props}
          onEventClick={this.onEventClick.bind(this)}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer, eventDetailsReducer, loginReducer, drawerReducerEL } = state;

  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords,
    userCoords: mapReducer.userCoords,
    eventDetailsReducer: eventDetailsReducer,
    userId: loginReducer.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvents: addEvents,
    setCurrentEvent: setCurrentEvent,
    updateButton: updateButton,
    setCurrentEventParticipants: setCurrentEventParticipants,
    toggleELDrawer: toggleELDrawer,
    addEvents: addEvents
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
