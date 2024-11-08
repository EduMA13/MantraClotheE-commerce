import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '../../global.css'

export default function RegisterSesion({navigation}) {
  /* Contraseña */
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  /* Phone number */
  const [phone, setPhone] = useState('');

  const formatPhoneNumber = (number) => {
    return number
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      .substring(0, 14);
  };

  const handleChangeText = (text) => {
    setPhone(formatPhoneNumber(text));
  };

  // Función para validar la contraseña
  const validatePassword = (pass) => {
    // Expresión regular para cumplir con los requisitos
    const lengthCheck = /.{8,}/;                   // Mínimo 8 caracteres
    const uppercaseCheck = /[A-Z]/;                // Al menos una mayúscula
    const numberCheck = /[0-9]/;                   // Al menos un número
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/;  // Al menos un símbolo

    return (
      lengthCheck.test(pass) &&
      uppercaseCheck.test(pass) &&
      numberCheck.test(pass) &&
      symbolCheck.test(pass)
    );
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsValid(validatePassword(text));
  };


  return (

    <SafeAreaView className="flex-1 justify-between bg-[#f52c56]">
      {/* Header */}
      <View className="items-center">
        <Text className="text-9xl font-bold text-white">M</Text>
        <Text className="text-2xl font-bold text-white">Register to Mantra</Text>
      </View>

      {/* Body */}
      <View className="gap-10 bg-white rounded-lg h-auto justify-center items-center shadow-md mx-3">

        <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around  items-center mt-5" >
          <Feather name="user" size={20} color="black" />
          <TextInput className="w-[200px]" placeholder='Jan Modaal'></TextInput>
        </View>

        <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around  items-center" >
          <Entypo name="mail" size={20} color="black" />
          <TextInput className="w-[200px]" placeholder='youremail@example.com'></TextInput>
        </View>

        <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around items-center">
          <MaterialIcons name="password" size={20} color="black" />
          <TextInput className="w-[200px]" placeholder='Thisisapasswordexample' secureTextEntry={true} value={password} onChangeText={handlePasswordChange}></TextInput>
        </View>

        {!isValid && (
          <View className="mt-2 p-2 bg-[#ffe0e0] rounded-md">
            <Text className="text-[14px]">Your password must include:</Text>
            <Text className="text-[14px]">
              {password.length < 8 ? '• At least 8 characters\n' : ''}
              {!/[A-Z]/.test(password) ? '• An uppercase letter\n' : ''}
              {!/[0-9]/.test(password) ? '• A number\n' : ''}
              {!/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '• A symbol\n' : ''}
            </Text>
          </View>
        )}



        <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around  items-center" >
          <Entypo name="direction" size={20} color="black" />
          <TextInput className="w-[200px]" placeholder='Your direction'></TextInput>
        </View>

        <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around  items-center" >
          <Entypo name="phone" size={20} color="black" />
          <TextInput className="w-[200px]" keyboardType='numeric' value={phone} onChangeText={handleChangeText} placeholder='Your phone number'></TextInput>

        </View>

        <View className="items-center">
          <TouchableOpacity onPress={()=> navigation.navigate('LoginSuccess')}>
            <View className="bg-blue-500 justify-center items-center rounded-lg w-[300px] h-[50px] mb-5">
              <Text className="text-lg text-center text-white font-semibold">Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center">
        <Text className="text-md font-bold text-white underline">Already have an account? Sign Up!</Text>
      </View>
    </SafeAreaView>
  )
}