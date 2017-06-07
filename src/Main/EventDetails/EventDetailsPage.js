import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-design';
import moment from 'moment';
import axios from 'axios';

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleAttend = this.handleAttend.bind(this);
  }

  handleAttend() {
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];
    axios.post('http://localhost:3000/api/attendEvent', {
      eventId: currentEvent.id,
      userId: this.props.userId
    })
    .then(res => {
      console.log(res.data);
      alert('You are going to ' + currentEvent.event_name + '!');
      this.props.disableButton({ attendDisabled: true });
    })
    .catch(err => { console.log(err); });
  }

  handleLike() {
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];
    axios.post('http://localhost:3000/api/likeEvent', {
      eventId: currentEvent.id,
      userId: this.props.userId
    })
    .then(res => {
      console.log(res.data);
      this.props.disableButton({ likeDisabled: true });
    })
    .catch(err => { console.log(err); });
  }

  render () {
    let participants = this.props.eventDetailsReducer.participants.map(obj => obj.display);
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];
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
        {"\n"}
        Participants: {participants.join(', ')}
        </Text>
        <Button
          value="LIKE"
          raised={true}
          onPress={this.handleLike}
          disabled={this.props.eventDetailsReducer.likeDisabled}/>
        <Button
          value="ATTEND"
          raised={true}
          onPress={this.handleAttend}
          disabled={this.props.eventDetailsReducer.attendDisabled}
        />
      </View>
    )
  }
}
