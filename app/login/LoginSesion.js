import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import '../../global.css'

export default function LoginSesion({ navigation }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.33:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (response.ok) {
        navigation.navigate("LoginSuccess");
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-between bg-[#f52c56]">
      <View className="items-center flex-1 justify-between">
        {/* Header */}
        <View>
          <Text className="text-9xl font-bold text-center text-white">
            M
          </Text>
          <Text className="text-2xl font-bold text-center text-white">
            Let's start with Sign Up !
          </Text>
        </View>

        {/*Content*/}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="gap-5 bg-white rounded-lg h-96  justify-center items-center shadow-md px-5 py-5">

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center" >
              <Entypo name="mail" size={20} color="black" />
              <TextInput onChangeText={setMail} className="w-[200px]" placeholder='youremail@example.com'></TextInput>
            </View>

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <MaterialIcons name="password" size={20} color="black" />
              <TextInput onChangeText={setPassword} className="w-[200px]" placeholder='yourpasswordexample' secureTextEntry={true}></TextInput>
            </View>

            <TouchableOpacity onPress={()=> navigation.navigate('Recovery')}>
              <View>
                <Text className="underline text-gray-400">
                  Forgot Password? Go here
                </Text>
              </View>
            </TouchableOpacity>


            <View className=" items-center">
              <TouchableOpacity onPress={handleLogin}>
                <View className="bg-blue-500 justify-center items-center rounded-lg w-[300px] h-[50px]">
                  <Text className="text-lg text-center text-white font-semibold">Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </TouchableWithoutFeedback>

        {/*Footer */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text className="text-md font-bold text-white underline">
              Don't have an account? Register now!
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}