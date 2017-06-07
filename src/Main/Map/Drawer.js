import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

class Drawer extends Component {
  render() {
    return(
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={true}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <View style={{marginTop: 22}}>
              <ScrollView>
                <View>
                  <Button value="CANCEL" raised={true} onPress={} />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
    );
    }
  }
}
