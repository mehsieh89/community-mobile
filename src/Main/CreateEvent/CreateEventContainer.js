import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import CreateEventComponent from './CreateEventComponent';
import { toggleCreateEvent } from './createEventActions';

class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <CreateEventComponent toggleCreateEvent={this.props.toggleCreateEvent} visible={this.props.createEventReducer}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { createEventReducer } = state;
  return {
    createEventReducer: createEventReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleCreateEvent: toggleCreateEvent
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventContainer);
