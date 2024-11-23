import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import LottieView from "lottie-react-native";


export default function LoginSuccess({ navigation }) {
    return (
        <SafeAreaView className="bg-[#f52c56] flex-1 justify-center items-center">
            <View className="items-center justify-center bg-white shadow-md rounded-md h-1/2 w-96 gap-10">
                <View className="bg-white rounded-md shadow-md w-[150px] h-[150px] justify-center items-center">

                    <LottieView
                        source={require("../../assets/login/Done.json")}
                        style={{ width: 100, height: 100 }}
                        autoPlay
                        loop={false}
                    />
                </View>
                <View className="items-center">
                    <Text className="text-xl font-bold text-center">Login succesfull!</Text>
                    <Text className="text-lg text-center font-semibold">Welcome to Mantra!</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <View className="bg-blue-500 p-5 rounded-md" >
                        <Text className="text-white font-bold">Start Shooping!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )


}