import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentEvent, toggleEventDetails } from './eventDetailsActions';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
// import EventListComponent from './EventListComponent';
import EventDetails from './EventDetailsPage';

class EventDetailsContainer extends Component{
  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressEventList = () => {
      const { goBack } = navigation;
      goBack();
    }

    return {
      headerLeft: (<Button title="Event List" onPress={onPressEventList}></Button>)
    };
  }

  render() {
    return (
      <View>
        <EventDetails {...this.props}/>
      </View>
    );
  }
}

// TODO: add mapDispatchToProps to export default below

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer, eventDetailsReducer } = state;

  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords,
    showEventDetails: eventDetailsReducer.showEventDetails,
    currentEventIndex: eventDetailsReducer.currentEventIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCurrentEvent: setCurrentEvent,
    toggleEventDetails: toggleEventDetails
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer);
