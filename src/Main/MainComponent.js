import React, { Component } from 'react';
import setUserName from './mainActions';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Map from './Map/MapContainer';
import EventList from './EventList/EventListContainer';
import EventDetails from './EventDetails/EventDetailsContainer';
// import axios from 'axios';

class MainComponent extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const MainNav = StackNavigator({
      Map: { screen: Map },
      EventList: { screen: EventList },
      EventDetails: { screen: EventDetails }
    });

    return (
      <MainNav screenProps={this.props}/>
    );
  }
}

export default MainComponent;
