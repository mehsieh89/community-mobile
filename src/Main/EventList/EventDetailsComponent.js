import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import moment from 'moment';

export default class EventDetails extends Component {

  render () {
    console.log('all events', this.props.allEvents)
    console.log('current index', this.props.currentEventIndex)
    let currentEvent = this.props.allEvents[this.props.currentEventIndex];
    let parsedTime = moment(currentEvent.time).format('MMMM Do YYYY, h:mm a') + ' (' + moment(currentEvent.time).fromNow() + ')';
    return (
      <MaterialDialog
        title={currentEvent.event_name}
        visible={this.props.showEventDetails}
        onCancel={() => { this.props.toggleEventDetails() }}
        >
        <Text>
        Time: {parsedTime}
        {"\n"}
        Location: {currentEvent.location}
        {"\n"}
        Description: {currentEvent.description}
        {"\n"}
        Category: {currentEvent.category}
        </Text>

      </MaterialDialog>
    )
  }
}
