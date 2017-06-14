import { Toolbar } from 'react-native-material-ui';
import { View, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

class MapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      autoComplete: [],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleEventListClick = this.handleEventListClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);

  }

  handleChange(text) {
    return new Promise ((resolve, reject) => {
      resolve(this.setState({
        searchText: text
      }));
    })
    .then(() => { this.handleInput(this.state.searchText) });
  }

  handleInput(location) {
    const string = location.split(' ').join('+');
    axios.post(baseUrl + '/api/locationInput', { location: string })
    .then((res) => {
      let acArray = [];
      for (let i = 0; i < res.data.length; i++) {
        acArray.push(res.data[i]);
      }
      return acArray;
    })
    .then((array) => {
      this.setState({ autoComplete: array })
    })
    .catch((err) => { console.log(err); })
  }

  handleSearch() {
    this.setState({
      autoComplete: [],
    });
    const string = this.state.searchText.split(' ').join('+');
    axios.post('http://localhost:3000/api/locationInput', { location: string })
    .then ((res) => {
      const lat = res.data[0].geometry.location.lat;
      const lng = res.data[0].geometry.location.lng;
      this.props.onLocationChange({
        latitude: lat,
        longitude: lng,
      })
    })
    .catch((err) => { console.log(err); })
  }

  handleSelection(location) {
    this.setState({
      searchText: location,
      autoComplete: [],
    })
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
      style={{height: 200}}
      placeholder='Search Location'
      onSubmitEditing={this.handleSearch}>
      </TextInput>
    )

    let marginDiff = 455 - 20 * this.state.autoComplete.length;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{marginBottom: marginDiff, alignItems: 'center'}}>
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
              {this.state.autoComplete.map((str, index) => {
                return (
                  <View key={index} style={{borderTopWidth: .5, borderLeftWidth: .5, borderRightWidth: .5,
                  borderTopColor: '#999', borderRightColor: '#999', borderLeftColor: '#999'}}>
                    <TouchableOpacity onPress={() => {this.handleSelection(str.formatted_address)}}
                      style={{height: 20, width: 350,
                        backgroundColor: 'white',
                      }}>
                      <Text style={{textAlign: 'center'}}>{str.formatted_address}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default MapHeader;
