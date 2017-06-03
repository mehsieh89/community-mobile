import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import CreateEventComponent from './CreateEventComponent';
import { toggleCreateEvent } from './createEventActions';
import { addEvents } from '../mainActions';

class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <CreateEventComponent
          userId={this.props.userId}
          toggleCreateEvent={this.props.toggleCreateEvent}
          addEvents={this.props.addEvents}
          visible={this.props.createEventReducer}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { createEventReducer, loginReducer } = state;
  return {
    userId: loginReducer.id,
    createEventReducer: createEventReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleCreateEvent: toggleCreateEvent,
    addEvents: addEvents
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventContainer);
