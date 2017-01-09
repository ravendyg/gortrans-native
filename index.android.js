import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  BackAndroid
} from 'react-native';

import { Map } from './src/map';
import { DrawerHolder } from './src/drawer';

import Drawer from 'react-native-drawer';

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

  // componentDidMount() {

  // }


  openControlPanel = () => {
    this._drawer.open();
    BackAndroid.addEventListener('hardwareBackPress', this.closeOnBack);
  };
  closeControlPanel = () => {
    this._drawer.close();
    BackAndroid.removeEventListener('hardwareBackPress', this.closeOnBack);
  };
  closeOnBack = () => {
    this.closeControlPanel();
    return true;
  }


  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<DrawerHolder/>}
      >
        <Map
          initialRegion={this.state.initialRegion}
          openControlPanel={this.openControlPanel}
        />
      </Drawer>
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
