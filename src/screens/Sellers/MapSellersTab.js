/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
// import {Container, Text} from './styles';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


const MapSellersTab = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {sellers} = useContext();

  return (
   <View style={StyleSheet.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={(map) => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={(e) => {
          Alert.alert(
            'coordenadas',
            'altitude= ' +
            e.nativeEvent.coordinate.latitude +
            'longitude= ' +
            e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.key}
                coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
                draggable
                image={marker.image}
              />
            );
          })}
      </MapView>
   </View>
  );
};
export default MapSellersTab;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
