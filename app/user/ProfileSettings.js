import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/authContext';


export default function ProfileSettings({ navigation }) {
  const { user, logout } = useContext(AuthContext); // Usa el contexto
  console.log(user); 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); 
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  if (!user) {
    // Renderiza un indicador de carga o un mensaje
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Cargando datos del usuario...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-between">
      <View className="m-5">
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <View className="mb-5">
            <AntDesign name="caretleft" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <Text className="text-3xl font-bold">Profile Settings</Text>
        <View className="mt-5 justify-around items-center bg-[#f52c56] h-96 rounded-lg shadow-md">
          <View className="rounded-full bg-white p-10 shadow-md">
            <AntDesign name="user" size={30} color="black" />
          </View>
          <Text className="text-white font-semibold">Name: {user.user.Name}</Text>
          <Text className="text-white font-semibold">Address: {user.user.Address}</Text>
          <Text className="text-white font-semibold">Phone:{user.user.Phone}</Text>
        </View>
      </View>

      <View className="items-center">
        <View className="bg-gray-300 w-[340px] h-16 items-center justify-between rounded-md flex-row">
          <Text className="text-center ml-5">Purchase history</Text>
          <AntDesign className="mr-5" name="right" size={20} color="black" />
        </View>
        <View className="bg-gray-300 w-[340px] h-16 items-center justify-between rounded-md m-5 flex-row">
          <Text className="text-center ml-5">Wishlist</Text>
          <AntDesign className="mr-5" name="right" size={20} color="black" />
        </View>
        <View className="bg-gray-300 w-[340px] h-16 items-center justify-between rounded-md flex-row">
          <Text className="text-center ml-5">Edit products</Text>
          <AntDesign className="mr-5" name="right" size={20} color="black" />
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <View className="justify-center items-center">
          <View className="bg-[#f52c56] w-52 items-center p-5 rounded-lg shadow-md">
            <Text className="text-white font-bold">Logout</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
