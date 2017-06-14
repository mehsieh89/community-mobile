import axios from 'axios';
import { Button } from 'react-native-material-ui';
import moment from 'moment';
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard, StyleSheet, ScrollView } from 'react-native';

const baseUrl = 'http://localhost:3000';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      comments: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearText = this.clearText.bind(this);
    this.getLatestComments = this.getLatestComments.bind(this);
  }


  componentDidMount() {
    this.getLatestComments();
  }

  getLatestComments() {
    axios.get(baseUrl + '/api/retrieveComments?event_id=' + this.props.eventDetailsReducer.currentEventIndex)
    .then(comments => {
      const commentsArray = comments.data.map(comment => {
        return {
          username: comment.username,
          comment: comment.text,
          createdAt: comment.created_at
        };
      })
      .sort((latest, oldest) => {
        return new Date(oldest.createdAt) - new Date(latest.createdAt);
      });

      this.setState({comments: commentsArray});
    });
  }

  handleChange(comment) {
    this.setState({
      text: comment
    })
  }

  handleSubmit() {
    axios.post(baseUrl + '/api/comments', {
      text: this.state.text,
      event_id: this.props.eventDetailsReducer.currentEventIndex,
      profile_id: this.props.userId
    })
    .then(() => {
      this.clearText();
    })
    .then(() => {
      this.getLatestComments();
    })
    .catch(error => {
      console.error('An error occurred while posting a comment ', error)
    })
  }

  clearText() {
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <View>
        <TextInput
          editable={true}
          autoCorrect={false}
          placeholder='Say something about this event...'
          style={styles.textField}
          onChangeText={this.handleChange}
          value={this.state.text}
        />
        <View style={styles.button}>
          {this.state.text === '' ?
          <Button
            raised={true}
            disabled={true}
            text="Comment"
            style={styles.button}
            >
            </Button>
            :
            <Button
              raised={true}
              onPress={this.handleSubmit}
              text="Comment"
              style={styles.button}
              >
              </Button>
            }
        </View>
        <View>
          <ScrollView>
             <View>
              {this.state.comments.map(comment => {
                return (
                  <View style={styles.container}>
                    <Text style={styles.username}>{comment.username} • <Text style={styles.time}>{moment(comment.createdAt).fromNow()}</Text></Text>
                    <Text style={styles.comment}>{comment.comment}</Text>
                  </View>
                );
              })}
             </View>
          </ScrollView>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
    padding: 7
  },
  container: {
    fontFamily: 'Roboto',
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 0,
    borderRadius: 3,
    padding: 5,
    backgroundColor: 'white'
  },
  comment: {
    marginTop: 5,
  },
  textField: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 7,
    marginBottom: 10
  },
  time: {
    textAlign: 'right',
    fontWeight: 'normal'
  },
  username: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
  },
});



export default Comments;
