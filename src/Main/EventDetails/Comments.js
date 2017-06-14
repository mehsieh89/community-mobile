import axios from 'axios';
import { Button } from 'react-native-material-design';
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    console.log('getting inside handleSubmit')
    axios.post(baseUrl + '/api/comments', {
      text: this.state.text,
      event_id: this.props.eventDetailsReducer.currentEventIndex,
      profile_id: this.props.userId
    })
    .then(() => {
      console.log('handleSubmit was called - inside then statement')
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

  render() { // FIX ME
    console.log('Props inside comments === ', this.props)
    return (
      <View>
        <Text>
            Comments go here!
        </Text>
          <TextInput
            editable={true}
            autoCorrect={false}
            placeholder='Say something about this event...'
            style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white',}}
            onChangeText={this.handleChange}
            value={this.state.text}
          />
          <Button
            value='Comment'
            raised={true}
            onPress={this.handleSubmit}
          >
          </Button>
          <View>

          </View>
      </View>

    );
  }
}

const styles = {
  container: {
    display: 'inline-block',
    lineHeight: '16px',
    borderColor: '#eee #ddd #bbb',
    borderRadius: '5',
    borderStyle: 'solid',
    borderWidth: '1',
    boxShadow: '0 1 3 rgba(0, 0, 0, 0.15)',
    margin: '5',
    padding: '20',
    width: '673'
  },
  button: {
    border: '1px solid #5E35B1',
    borderRadius: '10px',
    marginLeft: '18px',
    float: 'right',
    marginRight: '10',
    marginTop: '10'
  },
  inputField: {
    borderColor: '#5E35B1',
    width: '555',
    marginTop: '10',
    marginLeft: '7',
    marginBottom: '10'
  },
  colLeft: {
    float: 'left',
  },
  comment: {
    display: 'inline-block',
    width: '560',
    marginTop: '10',
    wordWrap: 'normal',
  },
  time: {
    float: 'right',
    display: 'inline-block',
  }
};

export default Comments;
