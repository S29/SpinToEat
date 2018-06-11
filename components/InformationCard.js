import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class InformationCard extends Component{

    constructor (props) {
        super(props)
    }

    render() {
        let data = this.props.data
        let item = data.terms[0].value    // name of place without address
        return <View style={{flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}
                numberOfLines={2}> {data.description} 
            </Text>
            <View style={{position: 'absolute', right: 0, bottom: 0}}>

                <TouchableOpacity
                    onPress={() => this.props.onAddToWheelPressed(item)}
                    style={{
                        backgroundColor: 'green', 
                        borderRadius: 5,
                        height: 45, 
                        width: 90, 
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{color: 'white'}}>Add to wheel</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}


InformationCard.propTypes = {
    onAddToWheelPressed: PropTypes.func.isRequired
}