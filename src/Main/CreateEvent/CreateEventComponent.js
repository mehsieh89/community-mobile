import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  PickerIOS,
  DatePickerIOS,
  ImagePickerIOS,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  AlertIOS
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-design';
import axios from 'axios';
import { RNS3 } from 'react-native-aws3';
import Spinner from 'react-native-loading-spinner-overlay';

const baseUrl = 'https://warriors-community.herokuapp.com';

class CreateEventComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      location: '',
      description: '',
      category: 'outdoors',
      dateTime: new Date(),
      eventImageUri: null,
      loading: false
    };

    this.submitEvent = this.submitEvent.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.pickEventImage = this.pickEventImage.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.showLoadingOverlay = this.showLoadingOverlay.bind(this);
    this.hideLoadingOverlay = this.hideLoadingOverlay.bind(this);
  }

  onDateChange(date) {
    this.setState({dateTime: date});
  }

  pickEventImage() {
    const context = this;
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      context.setState({
        eventImageUri: imageUri
      });
    }, (error) => {
      console.log(error);
    });
  }

  submitEvent() {
    let context = this;
    let alertMessage = '';

    if (!this.state.eventName) {
      AlertIOS.alert('Form Incomplete', 'Please enter an event name.');
      return;
    }

    if (!this.state.location) {
      AlertIOS.alert('Form Incomplete', 'Please enter an event location.');
      return;
    }

    if (!this.state.description) {
      AlertIOS.alert('Form Incomplete', 'Please enter an event description.');
      return;
    }


    if (this.state.eventImageUri) {

      const imageId = this.state.eventImageUri.split('id=')[1].split('&ext=')[0];
      const fileExt = this.state.eventImageUri.split('&ext=')[1];
      const fileName = imageId + '.' + fileExt.toLowerCase();
      const fileType = fileExt === 'JPG' ? 'image/jpeg' : 'image/png';

      this.showLoadingOverlay();

      const file = {
        uri: this.state.eventImageUri,
        type: fileType,
        name: fileName
      }

      axios.get(baseUrl + '/api/retrieveS3Credentials')
        .then((response) => {

          const options = {
            bucket: response.data.bucket,
            region: response.data.region,
            accessKey: response.data.accessKey,
            secretKey: response.data.secretKey,
            successActionStatus: response.data.successStatus
          }

          RNS3.put(file, options)
            .then(response => {
              console.log('Image upload to S3 successful', response);

              const eventInfo = Object.assign(
                {},
                this.state,
                { userId: context.props.userId,
                  imageUrl: response.headers.Location
                }
              );
              context.createEvent(eventInfo);
            })
            .catch((err) => {
                console.error("Failed to upload image to S3:", err);
            });
        })
        .catch((err) => {
          console.error('Error retrieving S3 credentials:', err);
        });
    } else {
      this.showLoadingOverlay();
      const eventInfo = Object.assign( {}, this.state, { userId: context.props.userId });
      this.createEvent(eventInfo);
    }
  }

  showLoadingOverlay() {
    this.setState({
      loading: true
    });
  }

  hideLoadingOverlay(callback) {
    this.setState({
      loading: false
    }, callback());
  }

  createEvent(eventInfo) {
    let context = this;

    axios.post(baseUrl + '/api/createEvent', eventInfo)
      .then(function (response) {
        return axios.get(baseUrl + '/api/retrieveEvents')
        .then(res => {
          context.props.addEvents(res.data);
        })
        .then(() => {
          context.hideLoadingOverlay(() => {});
        })
        .then(() => {
          context.props.toggleCreateEvent();
        })
        .catch(error => {
          console.log('Error while retrieving events:', error);
        });
      })
      .catch(function (error) {
        console.log('Error while creating event:', error);
        context.hideLoadingOverlay(() => {
          setTimeout(() => {
            AlertIOS.alert('Invalid Location', 'Please enter a valid event location.');
          }, 100);
        });
      });
  }

  render() {
    const PickerItemIOS = PickerIOS.Item;
    const categories = ['Food', 'Sports', 'Outdoors', 'Nightlife', 'Games', 'Other'];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={{marginTop: 22}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.props.visible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={{marginTop: 22}}>
             <Spinner visible={this.state.loading}/>
             <ScrollView style={{padding: 20}}>
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
                <Heading label="Event Image" />
                <Button text="" value="Choose Event Image" raised={true} onPress={this.pickEventImage} />
                {this.state.eventImageUri ?
                  <View style={styles.eventImageView}>
                    <Image style={styles.eventImage} source={{uri: this.state.eventImageUri}} />
                </View> : null}
                <Text> </Text>
                <Button text="" value="SUBMIT" raised={true} onPress={this.submitEvent} />
                <Button text="" value="CANCEL" raised={true} onPress={this.props.toggleCreateEvent} />
              </View>
            </ScrollView>
           </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
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
  eventImageView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventImage: {
    width: 350,
    height: 350,
    justifyContent: 'space-around',
    resizeMode: 'contain'
  }
});


export default CreateEventComponent;
