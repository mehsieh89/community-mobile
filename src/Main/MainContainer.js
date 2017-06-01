import React, { Component } from 'react';
import setUserName from './mainActions';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
//import Main from './MainComponent';
import Map from './Map/MapContainer';
import EventList from './EventList/EventListContainer';

class MainContainer extends Component {
  static navigationOptions = {
    header: null,
  }
  
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

const mapStateToProps = (state) => {
  const { username } = state;

  return {
    username: username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    greetUser: () => {
      dispatch(setUserName());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
