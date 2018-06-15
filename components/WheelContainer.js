import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Wheel from '../components/Wheel'
import { Divider } from 'react-native-elements';

const window = Dimensions.get('window');
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
            list: [],
            isAdding: false,
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
                        onPress={() => this.setState({isAdding: true})}
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

        {
            this.state.isAdding &&
            <View style={styles.addWindow}>
                <Text 
                    style={{
                        fontSize: 20, 
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                    }}> 
                    Add an item 
                </Text>

                <TextInput
                    style={{
                        height: 40, 
                        borderColor: 'gray', 
                        borderWidth: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 3,
                    }}
                />

                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20, 
                            backgroundColor: '#f44336', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            marginRight: 5,
                            marginLeft: 5,
                        }}
                    >
                        <Text> ✗ </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20, 
                            backgroundColor: '#8BC34A', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            marginRight: 5,
                            marginLeft: 5,
                        }}
                    >
                        <Text> ✓ </Text>
                    </TouchableOpacity>

                </View>
            </View>
        }
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
    },
    addWindow: { 
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 5,
        width: window.width/1.5,
        left: (window.width - window.width/1.5)/2,  // TODO: find another way to center the window
        top: window.height /3,   // above the add and search buttons
    }
  });