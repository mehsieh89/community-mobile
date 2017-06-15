import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleELDrawer } from './drawerActions';
import { LoginButton } from 'react-native-fbsdk';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUserProfile = this.handleUserProfile.bind(this);
  }

  handleLogout() {
    this.props.toggleELDrawer();
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  handleUserProfile() {
    this.props.toggleELDrawer();
    const { navigate } = this.props.navigation;
    navigate('UserProfile');
  }

  render() {
    return (
      <MaterialDialog
        title="Settings"
        visible={this.props.visible}
        onCancel={this.props.toggleELDrawer}
        >
        <View style={{ alignItems: 'center' }}>
          <Button raised upperCase={false} text="My Profile"
            icon='account-circle'
            onPress={this.handleUserProfile}
            style={{container: {backgroundColor: '#C22B33', width: 190, height: 30, marginBottom: 10, justifyContent: 'flex-start'}, text: {color: '#fff', fontSize: 13}, icon: {marginRight: 53, marginLeft: -12}}} />
          <LoginButton onLogoutFinished={this.handleLogout}/>
        </View>
      </MaterialDialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleELDrawer: toggleELDrawer
  }, dispatch);
}

const mapStateToProps = (state) => {
  const { drawerReducerEL } = state;
  return { visible: drawerReducerEL.visible };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
