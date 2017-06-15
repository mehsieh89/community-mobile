import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import TimelineComponent from './Timeline';
import UserProfileHeader from './UserProfileHeader';
import Drawer from './Drawer/DrawerContainer';

class UserProfileContainer extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <UserProfileHeader navigation={this.props.navigation}/>
        <TimelineComponent />
        <Drawer navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	  paddingTop: 0,
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50,
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  },
  textLocation: {
    marginLeft: 10,
    color: 'gray',
    fontWeight: 'bold'
  }
});

export default UserProfileContainer;
