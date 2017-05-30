import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

class HomePage extends Component {
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
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this.greetUser}
          title="submit name"
          color="#841584"
        />
        <Text style={styles.instructions}>
          Welcome to the Community, {this.props.username}!
        </Text>
        <Text style={styles.instructions}>
          Create or find your ideal event,{'\n'}
          where you can meet new friends and make memories of a lifetime!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default HomePage;
