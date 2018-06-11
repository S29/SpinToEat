import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
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
        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center', marginTop: 50}}> 
            <Wheel 
                list={list}
            />
        </View>
        <ScrollView
            horizontal={true}
            style={{
                backgroundColor: 'transparent',
                borderRadius: 30,
                flex: 1,
            }}
            contentContainerStyle={{ 
                padding: 30,
                paddingBottom: 40,
            }}
            showsHorizontalScrollIndicator={false}
        >
            {
                list.map((item) => {
                    return <TouchableOpacity key={item.id}
                        style={{
                            backgroundColor: 'white',
                            margin: 10,
                            borderRadius: 150/2,
                            width: 150,
                            height: 150,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 2,
                        }}
                        onPress={() => alert("To edit or delete")}
                    >
                        <Text> {item.value} </Text>
                    </TouchableOpacity>
                })
            }
        </ScrollView>
    </View>
  }
}