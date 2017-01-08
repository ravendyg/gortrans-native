'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Button
} from 'react-native';

import MapView from 'react-native-maps';

import { FloatingButtonAndroid } from "react-native-android-kit";

import { Store, test } from './store';

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
  fabContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingRight: 25
  },
  fab: {
    height: 50,
    width: 50,
    marginTop: 25,
    marginBottom: 25,
    padding: -10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
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

    this.state = {
      showSearchBtn: false
    };

    this.fabBackgroundColor = '#ffefefef';
  }

  onRegionChangeComplete(region) {
    AsyncStorage.setItem('@gortransStore:initialRegion', JSON.stringify(region));
  }

  componentDidMount() {
    let unsubscribe = Store.subscribe(
      () => {
        if (Store.getState().dataLoaded) {
          unsubscribe();
          this.setState({
            showSearchBtn: true
          });
        }
      }
    )
  }

  componentWillUnmount()
  {

  }

  render() {
    let initialRegion = this.props.initialRegion;

    return (
      <View style = {styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        >
        </MapView>

        <View style = {styles.fabContainer}>
          <FloatingButtonAndroid
            style={styles.fab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'ic_zoom_in_black_24dp'
            onPress={
              () => console.log("Event onPress")
            }
          />

          <FloatingButtonAndroid
            style={styles.fab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'ic_zoom_out_black_24dp'
            onPress={
              () => console.log("Event onPress")
            }
          />

          <FloatingButtonAndroid
            style={styles.fab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'ic_room_black_24dp'
            textSize = {25}
            onPress={
              () => console.log("Event onPress")
            }
          />

        </View>

      </View>
    );
  }
}

test();