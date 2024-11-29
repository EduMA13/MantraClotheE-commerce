import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function FindStore() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const storeLocations = [
    { id: 1, title: 'Tienda A', latitude: 24.024135961466055, longitude: -104.66428053791103 },
    { id: 2, title: 'Tienda B', latitude: 24.034927593819795, longitude: -104.65327491623633 },
    { id: 3, title: 'Tienda C', latitude: 24.063948114084326, longitude: -104.58552655248907 },
  ];

  useEffect(() => {
    (async () => {
      // Solicita permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Obtiene la ubicación actual del usuario
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);



  return (
    <SafeAreaView className="flex-1 justify-between items-center ">
      <View className="bg-[#f52c56] w-full justify-center items-center rounded-b-2xl">
        <Text className="text-xl font-bold text-center w-[200px] text-white">Find your nearest MANTRA store</Text>
      </View>

      <View className="mb-5">
      {location ? (
        <MapView
          style={{ width: 900, height: 900 }}
          initialRegion={location}
          showsUserLocation={true}
          className="flex-1"
        >
          {storeLocations.map((store) => (
            <Marker
              key={store.id}
              coordinate={{ latitude: store.latitude, longitude: store.longitude }}
              title={store.title}
            >
              <Image
                source={require('../../assets/shop/icon_store.png')}
                className="w-8 h-8"
                style={{ resizeMode: 'contain' }}
              />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text className="text-center mt-5 text-red-500">
          {errorMsg ? errorMsg : 'Obteniendo ubicación...'}
        </Text>
      )}
    </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  map: {
    width: 500,
    height: 500,
  },
});