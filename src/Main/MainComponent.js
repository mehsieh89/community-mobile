import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    };

    this.greetUser = this.greetUser.bind(this);
  }

  greetUser(username) {
    return this.props.greetUser(username);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Some div</Text>
        </View>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        </View>
      </View>
    );
  }
      // <View style={styles.container}>
      //   <TextInput
      //     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      //     onChangeText={(text) => this.setState({text})}
      //     value={this.state.text}
      //   />
      //   <Button
      //     onPress={this.greetUser}
      //     title="submit name"
      //     color="#841584"
      //   />
      //   <Text style={styles.instructions}>
      //     Welcome to the Community, {this.props.username}!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Create or find your ideal event,{'\n'}
      //     where you can meet new friends and make memories of a lifetime!
      //   </Text>
      // </View>
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

export default Main;
