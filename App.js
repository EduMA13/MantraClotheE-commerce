import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/login/Login';
import LoginSesion from './app/login/LoginSesion';
import RegisterSesion from  './app/login/RegisterSesion';
import LoginSuccess from './app/login/LoginSuccess';
import MainMenu from './app/store/MainMenu';
import "./global.css"

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 1000 });
    headerTranslateY.value = withTiming(0, { duration: 1000 });
    buttonOpacity.value = withTiming(1, { duration: 1000, delay: 500 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 justify-between gap-5 bg-[#f52c56]">
      {/* Header */}
      <Animated.View className='flex flex-col justify-center items-center' style={headerStyle}>
        <Text className='text-9xl font-bold text-white'>M</Text>
        <Text className="text-8xl font-bold text-white">Mantra</Text>
        <Text className='text-white text-3xl font-semibold'>Online shopping</Text>
      </Animated.View>

      {/* Body */}
      <Animated.View className='flex flex-col gap-5 items-center justify-center ' style={headerStyle}>
        <Text className="text-white text-2xl font-semibold">
          Welcome to Mantra
        </Text>
        <Text className="text-white text-2xl w-72 text-center font-semibold"> 
          Your one-stop-shop for all your shopping needs.
        </Text>
      </Animated.View>

      {/* Footer */}
      <Animated.View className='flex flex-col justify-center items-center' style={headerStyle}>
        <Image
          source={require("./assets/app/women.png")}
          className="absolute bottom-[-490px]"
        />
      </Animated.View>

      {/* Animated Button */}
      <Animated.View className="flex justify-center items-center drop-shadow-md" style={buttonStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View className="w-72 bg-white rounded-md items-center h-[50px] justify-center shadow-md">
            <Text className="text-black text-2xl font-bold">Get Started</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name ="LoginScreen" component={LoginSesion}
        options={{animationEnabled:false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterSesion}/>
        <Stack.Screen name ="LoginSuccess" component={LoginSuccess}/>
        <Stack.Screen name="MainMenu" component={MainMenu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
