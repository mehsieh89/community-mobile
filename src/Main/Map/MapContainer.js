import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import Map from './MapComponent';
import { connect } from 'react-redux';

class MapContainer extends Component{
  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressEventList = () => {
      const { navigate } = navigation;
      navigate('EventList');
    }

    return {
      headerLeft: (<Button title="EventList" onPress={onPressEventList}></Button>)
    };
  }

  render() {
    return (
      <Map {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const { allEvents } = state;

  console.log('all events inside main container === ', state.allEvents)
  return {
    allEvents: allEvents
  };
};

export default connect(mapStateToProps)(MapContainer);
