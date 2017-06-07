import React, { Component } from 'react';
import { Modal, Text, View, ScrollView, PickerIOS, DatePickerIOS, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-design';
import axios from 'axios';

class CreateEventComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      location: '',
      description: '',
      category: 'outdoors',
      dateTime: new Date()
    };

    this.submitEvent = this.submitEvent.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({dateTime: date});
  }

  submitEvent() {
    let context = this;
    const eventInfo = Object.assign({}, this.state, { userId: this.props.userId });

    axios.post('http://localhost:3000/api/createEvent', eventInfo)
      .then(function (response) {
        console.log(response.data);
        return axios.get('http://localhost:3000/api/retrieveEvents')
        .then(res => {
          console.log('Events retrieved.', res.data);
          context.props.addEvents(res.data);
        })
        .then(() => {
          context.props.toggleCreateEvent();
        })
        .catch(error => {
          console.log('Error occurred.', error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

// TODO: image

  render() {
    const PickerItemIOS = PickerIOS.Item;
    const categories = ['food', 'sports', 'outdoors', 'nightlife', 'games', 'other'];

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
           <ScrollView>
            <View>
              <TextField
                label='Event Name'
                value={this.state.eventName}
                onChangeText={ (eventName) => this.setState({ eventName }) }
              />
              <TextField
                label='Location'
                value={this.state.location}
                onChangeText={ (location) => this.setState({ location }) }
              />


              <Heading label="Date & Time" />
              <DatePickerIOS
                date={this.state.dateTime}
                mode="datetime"
                // timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                minimumDate={new Date()}
                onDateChange={this.onDateChange}
              />

              <TextField
                label='Description'
                value={this.state.description}
                onChangeText={ (description) => this.setState({ description }) }
              />
              <Heading label="Event Category" />
              <PickerIOS
                selectedValue={this.state.category}
                onValueChange={(category) => {
                  this.setState({category});
                }}>
                {categories.map((cat, index) => (
                  <PickerItemIOS
                    key={index}
                    value={cat}
                    label={cat}
                  />
                ))}
              </PickerIOS>
              <Button value="SUBMIT" raised={true} onPress={this.submitEvent} />
              <Button value="CANCEL" raised={true} onPress={this.props.toggleCreateEvent} />
            </View>
          </ScrollView>
         </View>
        </Modal>
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});


export default CreateEventComponent;
