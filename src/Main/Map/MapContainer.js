import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';

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
      <View><Text>MAP</Text></View>
    );
  }
}

export default MapContainer;
