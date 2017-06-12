import { Toolbar } from 'react-native-material-ui';
import { View } from 'react-native';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Drawer from './Drawer/DrawerContainer';
import { toggleUPDrawer } from './Drawer/drawerActions';

class UserProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    // this.handleMainClick = this.handleMainClick.bind(this);
  }

  handleMenuClick() {
    this.props.toggleUPDrawer();
  }

  // handleMainClick() {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // }

  render() {
    return(
      <View style={{ marginTop: 30, marginBottom: 20, alignItems: 'center' }}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.handleMenuClick}
          centerElement="Timeline"
          // rightElement="satellite"
          // onRightElementPress={this.handleMapClick}
          style={{
            leftElement: { color: '#777'},
            // rightElement: { color: '#777'},
            titleText: { color: '#777', fontSize: 14 },
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { drawerReducerUP } = state;
  return { visible: drawerReducerUP.visible };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleUPDrawer: toggleUPDrawer
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileHeader);
