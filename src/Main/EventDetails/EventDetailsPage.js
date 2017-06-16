import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AlertIOS, ScrollView } from 'react-native';
import { Avatar, Button, Toolbar } from 'react-native-material-ui';
import moment from 'moment';
import axios from 'axios';
import Comments from './Comments';

const baseUrl = 'http://localhost:3000';

export default class EventDetails extends Component {

  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleAttend = this.handleAttend.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleAttend() {
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];

    axios.post(baseUrl + '/api/attendEvent', {
      eventId: currentEvent.id,
      userId: this.props.userId
    })
    .then(res => {
      console.log(res.data);
      AlertIOS.alert('Attendance Confirmed', 'You are going to ' + currentEvent.event_name + '!');
      this.props.disableButton({ attendDisabled: true });
    })
    .catch(err => { console.log(err); });
  }

  handleLike() {
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];

    axios.post(baseUrl + '/api/likeEvent', {
      eventId: currentEvent.id,
      userId: this.props.userId
    })
    .then(res => { this.props.disableButton({ likeDisabled: true }); })
    .catch(err => { console.log(err); });
  }

  handleGoBack() {
    this.props.navigation.goBack();
  }

  render () {
    let participants = this.props.eventDetailsReducer.participants;
    let currentEvent = this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex];
    let parsedTime = moment(currentEvent.time).format('MMMM Do YYYY, h:mm a') + ' (' + moment(currentEvent.time).fromNow() + ')';

    return (
      <View>
        <ScrollView>
          <View style={{ marginTop: 30, marginBottom: 20, alignItems: 'center' }}>
            <Toolbar
              leftElement="navigate-before"
              onLeftElementPress={this.handleGoBack}
              centerElement="Event List"
              style={{
                leftElement: { color: '#31575B'},
                titleText: { color: '#31575B', fontSize: 14 },
              }}
            />
          </View>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Image source={{uri: currentEvent.image}} style={{width: 200, height:200, borderRadius: 100}}/>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.bold}>Name: <Text style={styles.text}>{currentEvent.event_name} {"\n"}</Text></Text>
              <Text style={styles.bold}>Time: <Text style={styles.text}>{parsedTime} {"\n"}</Text></Text>
              <Text style={styles.bold}>Location: <Text style={styles.text}>{currentEvent.location} {"\n"}</Text></Text>
              <Text style={styles.bold}>Description: <Text style={styles.text}>{currentEvent.description} {"\n"}</Text></Text>
              <Text style={styles.bold}>Category: <Text style={styles.text}>{currentEvent.category}{"\n"}</Text></Text>
              <Text style={styles.bold}>Participants:</Text>
              {participants.map(participant => {
                return (
                  <View style={{width: 60, height: 60, marginTop: 5, marginHorizontal: 3}}>
                    <Image source={{uri: participant.profile_picture}} style={{width: 50, height:50, borderRadius: 25}}/>
                  </View>
                );
              })}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>
              <Button raised text='LIKE'
                style={{container: {width: 130, marginHorizontal: 15, backgroundColor: '#31575B'}, text: {color: 'white'}}}
                onPress={this.handleLike}
                disabled={this.props.eventDetailsReducer.likeDisabled}/>
              <Button raised text='ATTEND'
                style={{container: {width: 130, marginHorizontal: 15, backgroundColor: '#31575B'}, text: {color: 'white'}}}
                onPress={this.handleAttend}
                disabled={this.props.eventDetailsReducer.attendDisabled}/>
            </View>
            <Comments {...this.props} currentEvent={this.props.allEvents[this.props.eventDetailsReducer.currentEventIndex]}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#31575B',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#31575B'
  }
});
