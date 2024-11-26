import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '../../global.css';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RegisterSesion({ navigation }) {

  /*Datos */
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [address, setAddress] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  /* Contraseña */
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  /* Phone number */
  const [phone, setPhone] = useState('');

  /* Dropdown */
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '¿Cuál es tu color favorito?', value: 'color' },
    { label: '¿Cuál es el nombre de tu mascota?', value: 'mascota' },
    { label: '¿En qué ciudad naciste?', value: 'ciudad' },
  ]);

  const formatPhoneNumber = (number) => {
    return number
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      .substring(0, 14);
  };

  const handleChangeText = (text) => {
    setPhone(formatPhoneNumber(text));
  };

  const handleRegister = async () => {
    if (!name || !mail || !password || !address || !phone || !securityQuestion || !securityAnswer) {
      alert("All fields are required.");
      return;
    }
    
    if (!isValid) {
      alert("Please enter a valid password.");
      return;
    }

    const userData = {
      name,
      mail,
      password,
      address,
      phone,
      securityQuestion,
      securityAnswer
    };

    try {
      // Envía los datos al backend o a la base de datos
      const response = await fetch("http://192.168.1.32:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigation.navigate("LoginScreen"); // Redirige al login
      } else {
        alert("Failed to register. Try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const validatePassword = (pass) => {
    const lengthCheck = /.{8,}/;
    const uppercaseCheck = /[A-Z]/;
    const numberCheck = /[0-9]/;
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/;

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#f52c56] justify-between">
        {/* Header */}
        <View className="items-center mt-2">
          <Text className="text-9xl font-bold text-white">M</Text>
          <Text className="text-2xl font-bold text-white">Register to Mantra</Text>
        </View>

        {/* Body */}

        <View className="flex-1 items-center justify-center mt-5">
          <View className="gap-5 bg-white rounded-lg  justify-center items-center shadow-md px-5 py-5">

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <Feather name="user" size={20} color="black" />
              <TextInput onChangeText={setName} className="w-3/4" placeholder="Jan Modaal" />
            </View>

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <Entypo name="mail" size={20} color="black" />
              <TextInput onChangeText={setMail} className="w-3/4" placeholder="youremail@example.com" />
            </View>

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <MaterialIcons name="password" size={20} color="black" />
              <TextInput
                className="w-3/4"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
              />
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

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <Entypo name="direction" size={20} color="black" />
              <TextInput onChangeText={setAddress} className="w-3/4" placeholder="Your address" />
            </View>

            <View className="flex-row bg-gray-300 rounded-lg w-full h-[50px] justify-around items-center">
              <Entypo name="phone" size={20} color="black" />
              <TextInput
                className="w-3/4"
                keyboardType="numeric"
                value={phone}
                onChangeText={handleChangeText}
                placeholder="Your phone number"
              />
            </View>

            <View>
              <Text className="font-bold">
                Security question
              </Text>
            </View>
            <View className="flex-row rounded-lg w-[370px] h-[50px] justify-around items-center">
              <DropDownPicker
                open={open}
                value={securityQuestion}
                items={items}
                setOpen={setOpen}
                setValue={setSecurityQuestion}
                setItems={setItems}
                placeholder="Selecciona una pregunta de seguridad"
                style={{ backgroundColor: '#f0f0f0', borderRadius: 10, borderColor: '#d1d5db' }}
                dropDownContainerStyle={{ backgroundColor: '#f0f0f0', borderRadius: 10 , borderColor: '#d1d5db' }}
              />
            </View>

              <View className=" flex bg-gray-300 rounded-lg w-[370px] h-[50px] justify-center items-center">
                <TextInput
                  placeholder="Respuesta a la pregunta"
                  value={securityAnswer}
                  onChangeText={setSecurityAnswer}
                />
              </View>


            <TouchableOpacity onPress={handleRegister}>
              <View className="bg-blue-500 justify-center items-center rounded-lg w-[300px] h-[50px] mb-5 mt-5">
                <Text className="text-lg text-center text-white font-semibold">Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        {/* Footer */}
        <View className="items-center mb-5 mt-5">
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text className="text-md font-bold text-white underline">Already have an account? Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}
