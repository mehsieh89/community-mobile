import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-material-design';
import { ActionButton } from 'react-native-material-ui';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import centerLocation from './mapActions';
import CreateEventContainer from '../CreateEvent/CreateEventContainer';
import MapHeader from './MapHeaderComponent';
import Drawer from './Drawer/DrawerContainer';
import Promise from 'bluebird';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      mapRegion: null,
      initialPosition: null,
      lastPosition: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.onCreateEvent = this.onCreateEvent.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocateUser = this.onLocateUser.bind(this);
    this.handleCalloutPress = this.handleCalloutPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

  }

  componentWillMount() {
    this.onLocateUser();
  }

  onLocateUser() {
    const context = this;
    navigator.geolocation.getCurrentPosition(position => {
      return new Promise ((resolve, reject) => {
        resolve(context.map.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
        }))
        context.props.centerLocation({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
        context.props.userLocation({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
      .catch(error => {
        console.log('Error occurred ', error);
      });
    })
  }

  onRefresh() {
    axios.get(baseUrl + '/api/retrieveEvents')
    .then(res => {
      this.props.addEvents(res.data);
    })
    .catch(error => {
      console.log('Error occurred.', error);
    });
  }

  onCreateEvent() {
    this.props.screenProps.toggleCreateEvent();
  }

  handleCalloutPress(marker, index) {
    this.props.setCurrentEvent(index);
    const { navigate } = this.props.navigation;
    navigate('EventDetails');
  }

  onLocationChange(coordsObj) {
    this.map.animateToRegion({
      latitude: coordsObj.latitude,
      longitude: coordsObj.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <MapView
              ref={map => { this.map = map }}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: this.props.coords.lat,
                longitude: this.props.coords.lng,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
              }}
            >
            {this.props.allEvents.map((marker, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: Number(marker.lat),
                  longitude:  Number(marker.lng)
                }}
                pinColor='maroon'
                onCalloutPress={this.handleCalloutPress}
                >
                  <MapView.Callout onPress={() => this.handleCalloutPress(marker, index)}
                    style={{width: 200, height: 70}}>
                    <View style={{position: 'relative'}}>
                      <Image style={{width: 70, height: 70}}
                        source={{uri: marker.image}}/>
                    </View>
                    <View style={{position: 'relative', left: 75, bottom: 65}}>
                      <Text style={{width: 130}}>
                        Name: {marker.event_name}
                        {"\n"}
                        Likes: {'5'}
                      </Text>
                    </View>
                  </MapView.Callout>
              </MapView.Marker>
            ))}
            </MapView>
            <MapHeader
              {...this.props}
              onLocationChange={this.onLocationChange}
            />
            <View style={{ marginLeft: 350 }}>
              <View style={actionButtonStyles.actionButton1}>
                <ActionButton icon="add" style={actionButtonStyles} onPress={this.onCreateEvent}/>
              </View>
              <View style={actionButtonStyles.actionButton2}>
                <ActionButton icon="gps-fixed" style={actionButtonStyles} onPress={this.onLocateUser}/>
              </View>
              <View style={actionButtonStyles.actionButton3}>
                <ActionButton icon="refresh" style={actionButtonStyles} onPress={this.onRefresh}/>
              </View>
            </View>
            <CreateEventContainer />
            <Drawer navigation={this.props.screenProps.navigation}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const actionButtonStyles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
  },
  icon: {
    color: '#31575B'
  },
  actionButton1: { marginBottom: 50, },
  actionButton2: { marginBottom: 50, },
  actionButton3: { marginBottom: 20, }
});

export default MapComponent;
