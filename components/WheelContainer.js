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
    title: 'Wheel',
  };

  constructor(props) {
      super(props)
      this.state = {
            list: []
      }
  }

  onAddToWheelPressed(item) {
    // TODO: shorten name that are too long
    if(item.value.length >= 15) {
        let temp = item.value.split(' ')
        if(temp.length > 1) {
            item.value = temp[0] + " " + temp[1]
        }
    }
    let list = this.state.list
    list.push(item)
    this.setState({
        list: list
    })
  }
  
  render() {
    return <View style={{flex: 1}}>
        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center', marginTop: 50}}> 
            <Wheel 
                list={this.state.list}
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
                this.state.list.map((item) => {
                    return <TouchableOpacity key={item.id}
                        style={styles.largeCircle}
                        onPress={() => alert("To edit or delete")}
                    >
                        <Text> {item.value} </Text>
                    </TouchableOpacity>
                })
            }
            <View
               style={{flexDirection: 'row'}} 
            >
                <TouchableOpacity
                        style={[styles.smallCircle, {backgroundColor: 'white'}]}
                        // onPress={() => alert("To edit or delete")}
                        onPress={() => console.warn(this.state.list)}
                >
                    <Text> Add </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.smallCircle}
                        onPress={() => {
                            this.props.navigation.navigate('SearchScreen', 
                                {   
                                    key: 'WheelToSearch',
                                    onAddToWheelPressed: item => this.onAddToWheelPressed(item),
                                })
                        }}
                >
                    <Text> Search </Text>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
    largeCircle: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 150/2,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    smallCircle: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 75/2,
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    }
  });