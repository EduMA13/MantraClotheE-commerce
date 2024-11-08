import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Para el ícono de candado
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function LoginSuccess({ navigation }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const rotation = useSharedValue(0);

    const handleUnlock = () => {
        setIsUnlocked(true);
        rotation.value = withTiming(30, { duration: 500, }); // Rotación para abrir el candado
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });
    return (
        <SafeAreaView className="bg-[#f52c56] flex-1 justify-center items-center">
            <View className="items-center justify-center bg-white shadow-md rounded-md h-1/2 w-96 gap-10">
                <View className="bg-white rounded-md shadow-md w-[150px] h-[150px] justify-center items-center">
                    <TouchableOpacity onPress={handleUnlock}>
                        <Animated.View style={animatedStyle}>
                            <FontAwesome name={isUnlocked ? 'unlock' : 'lock'} size={90} color="black" />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <View className="items-center">
                    <Text className="text-xl font-bold text-center">Register succesfull!</Text>
                    <Text className="text-lg text-center font-semibold">Welcome to Mantra!</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('MainMenu')}>
                    <View className="bg-blue-500 p-5 rounded-md" >
                        <Text className="text-white font-bold">Start Shooping!</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )


}