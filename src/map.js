'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import MapView from 'react-native-maps';

import { test } from './store';

const styles = StyleSheet.create({
 container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
 },
 map: {
   position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
 },
});

export class Map extends React.Component {

  constructor() {
    super();
  }

  onRegionChangeComplete(region) {
    AsyncStorage.setItem('@gortransStore:initialRegion', JSON.stringify(region));
  }

  componentDidMount() {

  }

  componentWillUnmount()
  {

  }

  render() {
    let initialRegion = this.props.initialRegion;

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        >

        </MapView>
      </View>
    );
  }
}