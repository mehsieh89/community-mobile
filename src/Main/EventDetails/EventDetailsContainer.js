import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentEvent, setCurrentEventParticipants, disableButton } from './eventDetailsActions';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
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

const mapStateToProps = (state) => {
  const { mainReducer, mapReducer, eventDetailsReducer, loginReducer } = state;
  return {
    allEvents: mainReducer.allEvents,
    coords: mapReducer.coords,
    eventDetailsReducer: eventDetailsReducer,
    userId: loginReducer.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCurrentEvent: setCurrentEvent,
    setCurrentEventParticipants: setCurrentEventParticipants,
    disableButton: disableButton
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer);
