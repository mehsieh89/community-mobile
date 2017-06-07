import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
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
    this.handleMarkerPress = this.handleMarkerPress.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocateUser = this.onLocateUser.bind(this);
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
              title={marker.event_name}
              description={marker.description}
              pinColor='green'
              onPress={() => this.handleMarkerPress(marker, index)}
            >
            </MapView.Marker>
          ))}
          </MapView>
          <Button value="Locate User" raised={true} onPress={this.onLocateUser}/>
          <MapHeader
            {...this.props}
            onLocationChange={this.onLocationChange}
          />
          <CreateEventContainer />
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
