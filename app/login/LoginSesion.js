import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import '../../global.css'

export default function LoginSesion({ navigation }) {
  const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
  const colorValue = useSharedValue(0);
  const textValue =  useSharedValue(0);


  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1],
      ['#FFFFFF', '#f52c56'] // Cambia entre estos colores
    );
    return { backgroundColor };
  });

  const textColorStyle = useAnimatedStyle(() =>{
    const textColor = interpolateColor(
      textValue.value,
      [0, 1],
      ['#000000', '#FFFFFF'] 
    );
    return { color:textColor };
  });


  useEffect(() => {
    colorValue.value = withTiming(1, { duration: 150 }); 
    textValue.value = withTiming (1, {duration:150});
  }, []);

  return (
    <AnimatedSafeAreaView className="flex-1 justify-between" style={[backgroundColorStyle]}>
      <View className="items-center flex-1 justify-between">
        {/* Header */}
        <View>
          <Animated.Text className="text-9xl font-bold text-center" style={[textColorStyle]}>
            M
          </Animated.Text>
          <Animated.Text className="text-2xl font-bold text-center" style={[textColorStyle]}>
            Let's start with Sign Up !
          </Animated.Text>

        </View>

        {/*Content*/}
        <View className="gap-10 bg-white rounded-lg h-[350px] w-[385px] justify-center items-center shadow-md">
          <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around  items-center" >
            <Entypo name="mail" size={20} color="black" />
            <TextInput className="w-[200px]" placeholder='youremail@example.com'></TextInput>
          </View>

          <View className="flex flex-row bg-gray-300 gap-10 rounded-lg w-[350px] h-[50px] justify-around items-center">
            <MaterialIcons name="password" size={20} color="black" />
            <TextInput className="w-[200px]" placeholder='yourpasswordexample' secureTextEntry={true}></TextInput>
          </View>

          <View className=" items-center">
            <TouchableOpacity>
              <View className="bg-blue-500 justify-center items-center rounded-lg w-[300px] h-[50px]">
                <Text className="text-lg text-center text-white font-semibold">Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*Footer */}
        <View>
          <TouchableOpacity onPress={()=> navigation.navigate('RegisterScreen')}>
            <Text className="underline text-white">
              Don't have an account? Register now!
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </AnimatedSafeAreaView>
  )
}