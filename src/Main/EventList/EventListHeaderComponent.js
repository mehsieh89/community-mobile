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
      <View style={{ marginTop: 30, marginBottom: 20, alignItems: 'center' }}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.handleMenuClick}
          centerElement="Event List"
          rightElement="satellite"
          onRightElementPress={this.handleMapClick}
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

export default EventListHeader;
