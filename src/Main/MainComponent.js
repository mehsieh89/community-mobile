import React, { Component } from 'react';
import setUserName from './mainActions';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Map from './Map/MapContainer';
import EventList from './EventList/EventListContainer';
// import axios from 'axios';

class MainComponent extends Component {
  static navigationOptions = {
    header: null,
  }

  // componentDidMount() {
  //   axios.get('SERVER_URL' + '/retrieveEvents')
  //   .then(({data}) => {
  //     console.log(data);
  //   })
  // }

  render() {
    const MainNav = StackNavigator({
      Map: { screen: Map },
      EventList: { screen: EventList }
    });

    return (
      <MainNav />
    );
  }

}

export default MainComponent;
