import { Toolbar } from 'react-native-material-ui';
import { View } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';

class MapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleEventListClick = this.handleEventListClick.bind(this);
  }

  handleChange(text) {
    this.setState({ searchText: text });
  }

  handleSearch() {
    const string = this.state.searchText.split(' ').join('+');
    axios.post('https://warriors-community.herokuapp.com/api/locationInput', { location: string })
    .then((res) => {
      const lat = res.data[0].geometry.location.lat;
      const lng = res.data[0].geometry.location.lng;
      this.props.onLocationChange({
        latitude: lat,
        longitude: lng,
      });
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
    return(
      <View style={{marginBottom: 440, alignItems: 'center', positon: 'absolute'}}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.handleMenuClick}
          centerElement="search location"
          rightElement="event"
          onRightElementPress={this.handleEventListClick}
          searchable={{
            autoFocus: true,
            placeholder: 'search',
            onChangeText: this.handleChange,
            onSubmitEditing: this.handleSearch,
            autoCorrect: false
          }}
          style={{
            leftElement: { color: '#777'},
            rightElement: { color: '#777'},
            titleText: { color: '#777', fontSize: 14 },
          }}
        />
      </View>
    );
  }
}

export default MapHeader;
