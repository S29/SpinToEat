import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-elements';
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
                <Button 
                    raised
                    title='Add to wheel'
                    onPress={() => this.props.onAddToWheelPressed(item)}
                    buttonStyle={{
                        backgroundColor: 'green',
                        borderRadius: 5,
                    }}
                />
            </View>
        </View>
    }
}


InformationCard.propTypes = {
    onAddToWheelPressed: PropTypes.func.isRequired
}