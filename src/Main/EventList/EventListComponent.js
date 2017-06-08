import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  Image,
  TouchableWithoutFeedback,
  View, Dimensions } from 'react-native';
import axios from 'axios';
import EventListHeader from './EventListHeaderComponent';
import Drawer from './Drawer/DrawerContainer';

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 0,
    marginVertical: 10,
    marginHorizontal: 7
  },
  text: {
    alignSelf: 'center',
    color: '#000',
  },
  scrollview: {
    height: '100%',
    width: '100%',
  },
  image: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onEventClick(this.props.index);
    this.props.setCurrentEvent(this.props.index);

    axios.post('https://warriors-community.herokuapp.com/api/retrieveParticipants', {
      eventId: this.props.data.id,
      userId: this.props.userId
    })
    .then(res => { this.props.setCurrentEventParticipants(res.data); })
    .catch(err => { console.log(err); });

    axios.post('https://warriors-community.herokuapp.com/api/connectEventToProfile', {
      eventId: this.props.data.id,
      userId: this.props.userId
    })
    .then(res => {
      this.props.disableButton({
        attendDisabled: !!res.data.is_attending,
        likeDisabled: !!res.data.liked
      });
    })
    .catch(err => { console.log(err); });
  };

  render() {
    return (
     <TouchableWithoutFeedback onPress={this.handleClick}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: this.props.data.image}}
          />
          <Text style={styles.text} >
            {this.props.data.event_name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class EventListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0
    };
    // this._onClick = this._onClick.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  render() {
    return (
      <View>
        <EventListHeader {...this.props}/>
        <Drawer navigation={this.props.screenProps.navigation}/>
        <ScrollView
          style={styles.scrollview}
          removeClippedSubViews={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }>
          {this.props.allEvents.map((row, index) => {
            return <Row key={index} data={row} index={index}
              userId={this.props.userId}
              setCurrentEvent={this.props.setCurrentEvent}
              setCurrentEventParticipants={this.props.setCurrentEventParticipants}
              disableButton={this.props.disableButton}
              onEventClick={this.props.onEventClick}
            />;
          })}
        </ScrollView>
      </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = ['newtest', 'newtest', 'newtest', 'newtest', 'newtest'];

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  };
}

export default EventListComponent;
