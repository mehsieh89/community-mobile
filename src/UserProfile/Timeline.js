import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import moment from 'moment';

class TimelineComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.renderDetail = this.renderDetail.bind(this);
  }

  componentWillMount() {
    axios.post('http://localhost:3000/api/retrieveUserEvents', { profileId: this.props.userId })
    .then((res) => {
      let parsed = res.data.map(entry => {
        let event = {};
        let date = new Date(entry.event.time);
        event.time = date.getTime();
        event.title = entry.event.event_name;
        event.description = entry.event.description;
        event.location = entry.event.location;
        event.imageUrl = entry.event.image;
        return event;
      });
      parsed.sort((a, b) => {
        return a.time - b.time;
      })
      parsed.forEach(entry => {
        let dateObj = new Date(entry.time)
        let newTime = moment(dateObj).fromNow();
         entry.time = newTime;
      });
      return parsed;
    })
    .then(data => {
      this.setState({
        events: data,
      });
    })
  }

  renderDetail(eventEntry) {
    let title = <Text style={[styles.title]}>{eventEntry.title}</Text>
    const desc = (
      <View style={styles.descriptionContainer}>
        <Image source={{uri: eventEntry.imageUrl}} style={styles.image}/>
        <View>
          <Text style={[styles.textDescription]}>
            {eventEntry.description}
          </Text>
          <Text style={[styles.textLocation]}>
            {eventEntry.location}
          </Text>
        </View>
      </View>
    )
   return (
      <View style={{flex:1, width:175}}>
        {title}
        {desc}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          lineColor='#31575B'
          circleColor='#31575B'
          data={this.state.events}
          innerCircle={'dot'}
          timeContainerStyle={{width: 77 }}//, marginTop: 40}}
          timeStyle={{textAlign: 'center', color: '#31575B'}} //backgroundColor: '#126129', color: 'white', padding: 5, borderRadius: 13}}
          renderDetail={this.renderDetail}
          // options={{style:{paddingTop:7}}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold',
    color: '#31575B'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50,
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  },
  textLocation: {
    marginLeft: 10,
    color: '#31575B',
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  const { loginReducer } = state;
  return {
    userId: loginReducer.id,
  };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     addEvents: addEvents,
//     toggleEventDetails: toggleEventDetails,
//     setCurrentEvent: setCurrentEvent,
//     setCurrentEventParticipants: setCurrentEventParticipants,
//     disableButton: disableButton
//   }, dispatch);
// };

export default connect(mapStateToProps)(TimelineComponent);
