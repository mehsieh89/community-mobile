import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';

class EventListContainer extends Component{
  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressMap = () => {
      const { goBack } = navigation;
      goBack();
    }

    return {
      headerLeft: (<Button title="Map" onPress={onPressMap}></Button>)
    };
  }

  render() {
    return (
      <View><Text>EVENT LIST</Text></View>
    );
  }
}

export default EventListContainer;
