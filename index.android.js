import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import { Map } from './src/map';

export default class gtest extends Component {

  constructor() {
    super();

    this.state = {
      initialRegion: {
        latitude: 54.998593335436926,
        longitude: 82.9591748046875,
        latitudeDelta: 0.3,
        longitudeDelta: 0.24,
      }
    };

    AsyncStorage.getItem('@gortransStore:initialRegion')
    .then( value => {
        if (value !== null) {
          this.setState({initialRegion: JSON.parse(value)});
        }
      }
    )
    .catch( error => {
      // Error retrieving data
      }
    );
  }

  render() {
    return (
        <Map initialRegion={this.state.initialRegion}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('gtest', () => gtest);
