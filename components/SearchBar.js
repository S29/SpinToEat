import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import apiConfig from '../apiKeys';
import InformationCard from '../components/InformationCard';
import PropTypes from 'prop-types';

const vancouver = {
  lat: 49.2379245,
  lon: -123.1058443,
}

export default class SearchBar extends Component{

  render() {
    return <View style = {{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        listViewDisplayed='auto'
        enablePoweredByContainer={false}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log(data);
          // console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: apiConfig.googleAutocompleteKey,
          language: 'en', // language of the results
          types: ['(restaurant)'], // default: 'geocode'
          radius: 15000,
          location: `${vancouver.lat}, ${vancouver.lon}`,
          strictbounds: true,
        }}
        styles={{
          description: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          containter: {
            flex: 1
          },
          row: {
            height: 150,
          }
        }}
        
        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        //currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'restaurant',
        }}
        
        
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        
        predefinedPlacesAlwaysVisible={true}

        renderRow = {(rowData) => {
                              return <View style={{flex: 1}}>
                                <InformationCard
                                  data={rowData}
                                  onAddToWheelPressed={(item) => this.props.onAddToWheelPressed(item)}
                                />
                              </View>
                          }
                    }
      />
    </View>
  }
}

SearchBar.propTypes = {
  onAddToWheelPressed: PropTypes.func.isRequired
}

