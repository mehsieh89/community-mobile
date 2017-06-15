import { Toolbar } from 'react-native-material-ui';
import { View } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';

class EventListHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMenuClick() {
    this.props.toggleELDrawer();
  }

  handleMapClick() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return(
      <View style={{ marginTop: 30, marginBottom: 2, alignItems: 'center' }}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.handleMenuClick}
          centerElement="Event List"
          rightElement="satellite"
          onRightElementPress={this.handleMapClick}
          style={{
            leftElement: { color: '#31575B'},
            rightElement: { color: '#31575B'},
            titleText: { color: '#31575B', fontSize: 14 },
          }}
        />
      </View>
    );
  }
}

export default EventListHeader;
