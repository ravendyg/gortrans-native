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
  mapFabContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingRight: 25
  },
  mapFab: {
    height: 50,
    width: 50,
    marginTop: 25,
    marginBottom: 25,
  },
  searchFabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 25
  },
  searchFab: {
    height: 50,
    width: 50,
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

        <View style = {styles.mapFabContainer}>
          <FloatingButtonAndroid
            style={styles.mapFab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'plus'
            onPress={
              () => console.log("Event onPress")
            }
          />
          <FloatingButtonAndroid
            style={styles.mapFab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'minus'
            onPress={
              () => console.log("Event onPress")
            }
          />
          <FloatingButtonAndroid
            style={styles.mapFab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'location'
            textSize = {25}
            onPress={
              () => console.log("Event onPress")
            }
          />
        </View>

        <View style = {styles.searchFabContainer}>
          <FloatingButtonAndroid
            style={styles.searchFab}
            backgroundColor={this.fabBackgroundColor}
            rippleColor='black'
            icon = 'search'
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