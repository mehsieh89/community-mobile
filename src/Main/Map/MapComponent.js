import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import centerLocation from './mapActions';
import Promise from 'bluebird';

// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      // lastLat: null,
      // lastLong: null,
      initialPosition: null,
      lastPosition: null
    };
  }

  componentWillMount() {
    console.log('props inside map component === ', this.props.coords);
    const context = this;
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Position === ', position)
        return new Promise ((resolve, reject) => {
          resolve(context.props.centerLocation({
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        )})
        .then(() => {
          console.log('Data retreived from geolcation ', this.props);
        })
        .catch(error => {
          console.log('Error occurred ', error);
        });
      })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <View style={styles.container}>
          <MapView
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.props.coords.lat,
              longitude: this.props.coords.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
          {this.props.allEvents.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: Number(marker.lat),
                longitude:  Number(marker.lng)
              }}
              title={marker.event_name}
              // description={
              //   // marker.time,
              //   // marker.location,
              //   // marker.description,
              //   // marker.category
              // }
              description={marker.location}
              pinColor='green'
            >
            </MapView.Marker>
          ))}
        </MapView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
