import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import '../../global.css';

export default function PasswordRecovery({ navigation }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Función para validar la contraseña
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

  const fetchSecurityQuestion = async () => {
    try {
      const response = await fetch(`http://192.168.1.33:3000/get-security-question?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        setSecurityQuestion(data.securityQuestion);
        setIsQuestionVisible(true);
      } else {
        Alert.alert('Error', 'Correo no encontrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) {
      Alert.alert('Error', 'La nueva contraseña no cumple con los requisitos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.33:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, securityAnswer, newPassword }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña restablecida.');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', 'Respuesta incorrecta o correo inválido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);

    if (!validatePassword(password)) {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.'
      );
    } else {
      setPasswordError('');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-5">Recuperar Contraseña</Text>
      {!isQuestionVisible ? (
        <>
          <TextInput
            className="border w-3/4 p-2 rounded-lg mb-3"
            placeholder="Ingresa tu correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={fetchSecurityQuestion} className="bg-blue-500 p-3 rounded-lg">
            <Text className="text-white font-semibold">Buscar Pregunta</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-lg font-semibold mb-3">{securityQuestion}</Text>
          <TextInput
            className="border w-3/4 p-2 rounded-lg mb-3"
            placeholder="Respuesta"
            value={securityAnswer}
            onChangeText={setSecurityAnswer}
          />
          <TextInput
            className="border w-3/4 p-2 rounded-lg mb-3"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
          {passwordError ? (
            <Text className="text-red-500 text-sm mb-3">{passwordError}</Text>
          ) : null}
          <TouchableOpacity onPress={handleResetPassword} className="bg-blue-500 p-3 rounded-lg">
            <Text className="text-white font-semibold">Restablecer Contraseña</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
