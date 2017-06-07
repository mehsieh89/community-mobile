import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Image } from 'react-native';
import { Button } from 'react-native-material-design';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import centerLocation from './mapActions';
import CreateEventContainer from '../CreateEvent/CreateEventContainer';
import MapHeader from './MapHeaderComponent';
import Promise from 'bluebird';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      mapRegion: null,
      // lastLat: null,
      // lastLong: null,
      initialPosition: null,
      lastPosition: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.onCreateEvent = this.onCreateEvent.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocateUser = this.onLocateUser.bind(this);
    this.handleCalloutPress = this.handleCalloutPress.bind(this);
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
            // onPress={this.handleMapPress}
          >
          {this.props.allEvents.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: Number(marker.lat),
                longitude:  Number(marker.lng)
              }}
              pinColor='green'
              // onPress={() => this.handleMarkerPress(marker, index)}
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
          <MapHeader {...this.props}
            onLocationChange={this.onLocationChange}
          />
          <Button value="Locate User" raised={true} onPress={this.onLocateUser}/>
          <Button value="Create Event" raised={true} onPress={this.onCreateEvent}/>
          <CreateEventContainer />
          {/* <EventDetails {...this.props}/> */}
        </View>
      </View>
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
  }
});

export default MapComponent;
