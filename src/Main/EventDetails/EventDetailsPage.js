import React, { Component } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

export default class EventDetails extends Component {

  render () {
    let currentEvent = this.props.allEvents[this.props.currentEventIndex];
    let parsedTime = moment(currentEvent.time).format('MMMM Do YYYY, h:mm a') + ' (' + moment(currentEvent.time).fromNow() + ')';
    return (
      <View>
        <Text>
        Name: {currentEvent.event_name}
        {"\n"}
        Time: {parsedTime}
        {"\n"}
        Location: {currentEvent.location}
        {"\n"}
        Description: {currentEvent.description}
        {"\n"}
        Category: {currentEvent.category}
        </Text>
      </View>
    )
  }
}
