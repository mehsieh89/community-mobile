import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import Map from './MapComponent';
import { connect } from 'react-redux';
import { centerLocation } from './mapActions';
import { addEvents } from './../mainActions';
//import toggleCreateEvent from '../CreateEvent/createEventActions';

class MapContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressEventList = () => {
      const { navigate } = navigation;
      navigate('EventList');
    }

    const onCreateEvent = () => {
      screenProps.toggleCreateEvent();
    };

    return {
      headerLeft:
        (<Button
          title="EventList"
          onPress={onPressEventList}>
        </Button>),
      headerRight:
        (<Button
          title="New"
          onPress={onCreateEvent}>
        </Button>)
    };
  }

  render() {
    return (
      <Map {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    centerLocation: centerLocation,
    addEvents: addEvents
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer } = state;

  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

