/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text, View, Button, } from 'react-native';
import SearchContainer from "./components/SearchContainer"
import WheelContainer from "./components/WheelContainer"

class App extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return <View style={{flex: 1}}>
    </View>
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

const navigator = StackNavigator({
  WheelScreen: { screen: WheelContainer },
  SearchScreen: { screen: SearchContainer },
});

export default navigator;