import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Wheel from '../components/Wheel'


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
    title: 'Spin the wheel!',
  };

  constructor(props) {
      super(props)
  }
  
  render() {
    const { navigation } = this.props;
    const list = navigation.getParam('param');
    return <View style={{flex: 1}}>
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100}}> 
        <Wheel 
            list={list}
        />
     </View>
    </View>
  }
}