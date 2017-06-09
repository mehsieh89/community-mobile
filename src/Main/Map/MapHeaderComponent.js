import { Toolbar } from 'react-native-material-ui';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';

class MapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      // autoComplete: ['meow', 'Amy', 'Mel', 'Yvonne', 'Ice Cream', 'Hello', 'Things', 'That', 'I', 'Like', '?', 'What'],
      autoComplete: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleEventListClick = this.handleEventListClick.bind(this);
  }

  handleChange(text) {
    return new Promise ((resolve, reject) => {
      resolve(this.setState({
        searchText: text
      }));
    })
    .then(() => {
      this.handleInput(this.state.searchText)
    });
  }

  handleInput(location) {
    const string = location.split(' ').join('+');
    axios.post('http://localhost:3000/api/locationInput', { location: string })
    .then((res) => {
      console.log('response from server', res)
      console.log('state array', this.state.autoComplete)
      let acArray = [];
      for (let i = 0; i < res.data.length; i++) {
        acArray.push(res.data[i].formatted_address);
      }
      return acArray;
    })
    .then((array) => {
      this.setState({
        autoComplete: array
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSearch() {
    const lat = res.data[0].geometry.location.lat;
    const lng = res.data[0].geometry.location.lng;
    this.props.onLocationChange({
      latitude: lat,
      longitude: lng,
    })
    .catch((err) => {
      console.log('Error ', err);
    });
  }

  handleMenuClick() {
    this.props.toggleDrawer();
  }

  handleEventListClick() {
    const { navigate } = this.props.navigation;
    navigate('EventList');
  }

  render() {
    const searchInput = (<TextInput value={this.state.searchText}
      onChangeText={(searchText) => this.handleChange(searchText)}
      editable={true}
      autoCorrect={false}
      style={{height: 200}}>
      </TextInput>
    )

    let marginDiff = 440 - 20 * this.state.autoComplete.length;
    return (
      <View style={{marginBottom: marginDiff, alignItems: 'center', positon: 'absolute'}}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.handleMenuClick}
          centerElement={searchInput}
          rightElement="event"
          onRightElementPress={this.handleEventListClick}
          style={{
            leftElement: { color: '#777'},
            rightElement: { color: '#777'},
            titleText: { color: '#777', fontSize: 14 },
          }}/>
          {/* <View style={{height: 300}}> */}
            {this.state.autoComplete.map((str, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {this.handleChange(str)}}
                  style={{height: 20, width: 350,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#777'
                  }}>
                  <Text style={{textAlign: 'center'}}>{str}</Text>
                </TouchableOpacity>
              );
            })}
          {/* </View> */}
      </View>
    );
  }
}

export default MapHeader;
