import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import Map from './MapComponent';
import { connect } from 'react-redux';
import { centerLocation } from './mapActions';

class MapContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressEventList = () => {
      const { navigate } = navigation;
      navigate('EventList');
    }

    return {
      headerLeft:
      (<Button
          title="EventList"
          onPress={onPressEventList}>
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
    centerLocation: centerLocation
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { allEvents, coords } = state;

  console.log('coords inside container === ', state.coords);
  return {
    allEvents: allEvents,
    coords: coords
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
