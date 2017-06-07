import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Modal} from 'react-native';
import { Button } from 'react-native-material-design';
import axios from 'axios';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={
      location: '',
      autocomplete: [],
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSearch() {
    const location = this.state.location
    const string = location.split(' ').join('+');
    axios.post('https://warriors-community.herokuapp.com/api/locationInput', {location: string})
    .then((data) => {
      const lat = data.data[0].geometry.location.lat;
      const lng = data.data[0].geometry.location.lng;
      this.props.onLocationChange({
        latitude: lat,
        longitude: lng,
      });
      this.props.toggleSearchBar();
    })
    .catch((err) => {
      console.log('Error ', err);
    })
  }

  onChange(value) {
    this.setState({
      location: value
    })
  }

  render() {
    return (
      <View>
        {/* <Button
          value="Search Bar"
          raised={true}
          onPress={this.props.toggleSearchBar}
        /> */}
        {/* <Modal
          visible={this.props.visible}
          transparent={true}
          animationType={'fade'}
          > */}
          <View style={{
            alignItems: 'center'}}>
            <TextInput
              style={{height: 40,
                width: 350,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: 'white',
                textAlign: 'center',}}
              value={this.state.location}
              placeholder={'...Location'}
              onChangeText={this.onChange}
              autoCorrect={false}
              >
            </TextInput>
            <Button value="SEARCH" raised={true} onPress={this.handleSearch}/>
            {/* <Button value="CANCEL" raised={true} onPress={this.props.toggleSearchBar} /> */}
          </View>
          {/* </Modal> */}
      </View>
    );
  }
}

export default SearchComponent;
