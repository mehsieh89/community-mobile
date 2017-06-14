import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-material-ui';
import axios from 'axios';


const baseUrl = 'http://localhost:3000';

class EventListOptionsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSortOptions: false,
      showFilterOptions: false,
    };
    this.handleSortBy = this.handleSortBy.bind(this);
    this.handleFilterBy = this.handleFilterBy.bind(this);
    this.handleLocationSort = this.handleLocationSort.bind(this);
    this.handlePopularitySort = this.handlePopularitySort.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  handleSortBy() {
    this.setState({
      showSortOptions: !this.state.showSortOptions
    })
  }

  handleFilterBy() {
    this.setState({
      showFilterOptions: !this.state.showFilterOptions
    })
  }

  handleLocationSort() {
    axios.post(baseUrl + '/api/retrieveEventsByLocation', this.props.userCoords)
    .then((res) => {
      this.props.addEvents(res.data);
      this.handleSortBy();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePopularitySort() {
    axios.get(baseUrl + '/api/retrieveEventsByPopularity')
    .then((res) => {
      this.props.addEvents(res.data);
      this.handleSortBy();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleCategorySelection(selection) {
    axios.get(baseUrl + '/api/retrieveEventsByCategory?query=' + selection)
    .then((res) => {
      this.props.addEvents(res.data);
      this.handleFilterBy();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const sortOptions = () => {
      if (this.state.showSortOptions) { return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <Button raised text="Sort By" onPress={this.handleSortBy} style={textButton} upperCase={false}/>
          <Button raised icon='location-on' text="" onPress={this.handleLocationSort} style={iconButton}/>
          <Button raised icon='favorite' text="" onPress={this.handlePopularitySort} style={iconButton}/>
        </View>
      )} else { return (
        <View>
          <Button raised text="Sort By" onPress={this.handleSortBy} style={textButton} upperCase={false}/>
        </View>
        )
      }
    }

    const filterOptions = () => {
      if (this.state.showFilterOptions) { return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <Button raised text="Filter By" onPress={this.handleFilterBy} style={textButton} upperCase={false}/>
          <Button raised icon='all-inclusive' text="" onPress={() => this.handleCategorySelection('All')} style={iconButton}/>
          <Button raised icon='local-dining' text="" onPress={() => this.handleCategorySelection('Food')} style={iconButton}/>
          <Button raised icon='pool' text="" onPress={() => this.handleCategorySelection('Sports')} style={iconButton}/>
          <Button raised icon='nature-people' text='' onPress={() => this.handleCategorySelection('Outdoors')} style={iconButton}/>
          <Button raised icon='local-bar' text="" onPress={() => this.handleCategorySelection('Nightlife')} style={iconButton}/>
          <Button raised icon='videogame-asset' text="" onPress={() => this.handleCategorySelection('Games')} style={iconButton}/>
          <Button raised icon='help' text="" onPress={() => this.handleCategorySelection('Other')} style={iconButton}/>
        </View>
      )} else { return (
        <View>
          <Button raised text="Filter By" onPress={this.handleFilterBy} style={textButton} upperCase={false}/>
        </View>
        )
      }
    }

    return (
      <View style={{alignItems: 'center', marginHorizontal: 12, backgroundColor: 'white', height: 40}}>
        <ScrollView
          horizontal={true}
          style={{width: '100%'}}>
          {sortOptions()}
          {filterOptions()}
        </ScrollView>
      </View>
    );
  }
}

const textButton = StyleSheet.create({
  container: {
  },
  text: {
    fontSize: 14,
    color: '#777'
  },
})

const iconButton = StyleSheet.create({
  container: {
    width: 63,
    padding: 0,
    margin: 0
  },
  icon: {
    fontSize: 24,
    margin: 0,
    padding: 0,
    color: '#3EB1E0',
    position: 'relative',
    left: 5,
  },
})

export default EventListOptionsBar;
