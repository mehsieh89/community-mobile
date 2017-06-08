import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentEvent, disableButton, setCurrentEventParticipants } from './../EventDetails/eventDetailsActions';
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

  onEventClick = (index) => {
    this.props.setCurrentEvent(index);
    const { navigate } = this.props.navigation;
    navigate('EventDetails');
  }

  render() {
    return (
      <View>
        <EventListComponent
          {...this.props}
          onEventClick={this.onEventClick.bind(this)}/>
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
    disableButton: disableButton,
    setCurrentEventParticipants: setCurrentEventParticipants
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
