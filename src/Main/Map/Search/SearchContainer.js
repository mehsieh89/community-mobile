import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchComponent from './SearchComponent';
import { toggleSearchBar} from './searchActions';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  render() {
    return (
      <View>
        <SearchComponent toggleSearchBar={this.props.toggleSearchBar} visible={this.props.searchReducer}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchReducer } = state;
  return {
    searchReducer: searchReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleSearchBar: toggleSearchBar
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
