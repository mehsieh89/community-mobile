import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import centerLocation from './mapActions';
import CreateEventContainer from '../CreateEvent/CreateEventContainer';
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
      latitude: 24.8615,
      longitude: 67.0099,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      modalVisible: false,
    };
    // this.handleMarkerPress = this.handleMarkerPress.bind(this);
  }

  componentDidMount() {
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
      })
      .then(() => {
        console.log('store coords after mount', this.props.coords)
      })
      .catch(error => {
        console.log('Error occurred ', error);
      });
    })
  }

  // handleMarkerPress(i) {
  //
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}>
            <View>
              <Text>
                Hello
              </Text>
            </View>
          </Modal> */}
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
            onPress={this.handleMapPress}
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
              // onPress={this.handleMarkerPress}
            >
            </MapView.Marker>
          ))}
          </MapView>
          <CreateEventContainer />
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
