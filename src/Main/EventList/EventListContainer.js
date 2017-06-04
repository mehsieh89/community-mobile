import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import EventListComponent from './EventListComponent';

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
      <View>
        <EventListComponent {...this.props}/>
      </View>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     centerLocation: centerLocation,
//     addEvents: addEvents
//   }, dispatch);
// }

// TODO: add mapDispatchToProps to export default below

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer } = state;

  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords
  };
};

export default connect(mapStateToProps)(EventListContainer);
