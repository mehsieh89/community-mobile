import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Modal} from 'react-native';
import { Button } from 'react-native-material-design';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 30}}>
        <Button
          value="Search Bar"
          raised={true}
          onPress={this.props.toggleSearchBar}
        />
        <Modal
          visible={this.props.visible}
          transparent={true}
          >
          <View style={{
            alignItems: 'center',
            marginTop: 70}}>
              <Text>
                Hello!!!!!!!
              </Text>
            <Button value="CANCEL" raised={true} onPress={this.props.toggleSearchBar} />
          </View>
          </Modal>
      </View>
    );
  }
}

export default SearchComponent;
