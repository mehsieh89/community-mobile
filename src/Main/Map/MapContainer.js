import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import Map from './MapComponent';
import { connect } from 'react-redux';
import { centerLocation, userLocation } from './mapActions';
import { addEvents } from './../mainActions';
import { setCurrentEvent, toggleEventDetails } from './../EventDetails/eventDetailsActions'
import { toggleDrawer } from './Drawer/drawerActions';

class MapContainer extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <Map {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    centerLocation: centerLocation,
    addEvents: addEvents,
    userLocation: userLocation,
    setCurrentEvent: setCurrentEvent,
    toggleEventDetails: toggleEventDetails,
    toggleDrawer: toggleDrawer
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer, eventDetailsReducer } = state;

  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords,
    userCoords: mapReducer.userCoords,
    showEventDetails: eventDetailsReducer.showEventDetails,
    currentEventIndex: eventDetailsReducer.currentEventIndex
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
