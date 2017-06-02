import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import Map from './MapComponent';

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
      <Map />
    );
  }
}

export default MapContainer;
