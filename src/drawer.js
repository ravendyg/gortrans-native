'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Store } from './store';

export class DrawerHolder extends React.Component {

  constructor() {
    super();
    this.state = Store.getState().drawer;
  }


  componentDidMount() {
    Store.subscribe(
      () => {
        let newState = Store.getState().drawer;
        if (newState !== this.state) {
          this.setState(newState);
        }
      }
    );
  }


  render() {
    let view;
    switch (this.state.mode) {
      case 'busSelector':
        view =
          <View>
            <Text>sdfsd</Text>
          </View>;
      break;

      default:
        view = <View/>;
    }
    return (
      view
    )
  }
}