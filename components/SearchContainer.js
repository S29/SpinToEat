import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SearchBar from "../components/SearchBar";
import { COLOR, ThemeProvider, ActionButton, } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class Home extends Component{
  static navigationOptions = {
    title: 'Search',
  };

  constructor (props) {
    super(props)
  }

  render() {
    let onAddToWheelPressed = this.props.navigation.getParam('onAddToWheelPressed')
    return <View style={{flex: 1}}>
    <ThemeProvider uiTheme={uiTheme}>
      <View style={{flex: 1}}>
        <SearchBar 
          onAddToWheelPressed={(item) => onAddToWheelPressed(item)}
        />
        <View style={{position: 'absolute', right: 50, bottom: 50}}>
          <ActionButton
            primary
            icon="done"
            size={80}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    </ThemeProvider>
    </View>
  }
}