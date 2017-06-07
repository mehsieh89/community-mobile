import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  Image,
  TouchableWithoutFeedback,
  View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 0,
    marginVertical: 10,
    marginHorizontal: 7
  },
  text: {
    alignSelf: 'center',
    color: '#000',
  },
  scrollview: {
    height: '100%',
    width: '100%',
  },
  image: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onEventClick(this.props.index);
    // console.log('props.currentEventIndex', this.props.currentEventIndex);
    // this.props.setCurrentEvent(this.props.index)
    // this.props.toggleEventDetails();
  };

  render() {
    return (
     <TouchableWithoutFeedback onPress={this.handleClick}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: this.props.data.image}}
          />
          <Text style={styles.text} >
            {this.props.data.event_name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class EventListComponent extends Component {
  // static title = '<RefreshControl>';
  // static description = 'Adds pull-to-refresh support to a scrollview.';
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0
    };
    // this._onClick = this._onClick.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  //  _onClick(row) {
  //   row.clicks++;
  //   this.setState({
  //     rowData: this.state.rowData,
  //   });
  // };
  // _onClick(row, index) {
  //   console.log('row', row);
  //   console.log('index', index);
  // }


  render() {
    // console.log('in EL comp', this.props.onEventClick)

    return (
      <ScrollView
        style={styles.scrollview}
        // bounces={false}
        // alwaysBounceVertical={false}
        removeClippedSubViews={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {this.props.allEvents.map((row, index) => {
          return <Row key={index} data={row} index={index}
                      toggleEventDetails={this.props.toggleEventDetails}
                      setCurrentEvent={this.props.setCurrentEvent}
                      onEventClick={this.props.onEventClick}
                      />;
        })}
      </ScrollView>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = ['newtest', 'newtest', 'newtest', 'newtest', 'newtest'];

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  };
}

// var createRow = ()

export default EventListComponent;
