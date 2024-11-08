import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export default function Login({ navigation }) {
  const ventajas = [
    {
      descripcion: "Free shipping on all your purchases",
      imagen: require('../../assets/login/envio.png'),
      color: "#f52c56"
    },
    {
      descripcion: "Safe and secure purchase",
      imagen: require('../../assets/login/locked.png'),
      color: "#50c878"
    },
    {
      descripcion: "24/7 support for your needs",
      imagen: require('../../assets/login/support.png'),
      color: "#4a90e2"
    },
  ];

  const expandedHeight = useSharedValue(150);
  const [index, setIndex] = useState(0);
  const fondoColor = useSharedValue(ventajas[0].color);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);

  const footerStyle = useAnimatedStyle(() => ({
    height: expandedHeight.value,
  }));

  const handleExpandAndNavigate = () => {
    expandedHeight.value = withTiming(1000, { duration: 600 }, (finished) => {
      if (finished) {
        runOnJS(navigation.navigate)('LoginScreen'); // Cambia 'NextScreen' por el nombre de la siguiente pantalla
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % ventajas.length;
      setIndex(nextIndex);
      fondoColor.value = withTiming(ventajas[nextIndex].color, { duration: 1000 });
    }, 3500);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    contentOpacity.value = 0;
    contentTranslateY.value = 50;
    contentOpacity.value = withTiming(1, { duration: 500 });
    contentTranslateY.value = withTiming(0, { duration: 500 });
  }, [index]);

  useEffect(() => {
    buttonOpacity.value = withTiming(1, { duration: 500 });
    buttonTranslateY.value = withTiming(0, { duration: 500 });
  }, []);

  const fondoStyle = useAnimatedStyle(() => ({
    backgroundColor: fondoColor.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <Animated.View style={[{ flex: 1, alignItems: 'center' }, fondoStyle]}>
      <View className="items-center mt-16">
        <Text className="text-center text-6xl font-bold text-white">Mantra</Text>
      </View>

      <Animated.View style={contentStyle} className="mt-[100px]">
        <Text className="text-2xl font-bold text-white text-center">{ventajas[index].descripcion}</Text>
        <Image source={ventajas[index].imagen} style={{ width: 350, height: 350, resizeMode: 'contain' }} />
      </Animated.View>
     

      {/* Pie de página con botón (animación separada) */}
      <Animated.View className="flex flex-col bg-white rounded-t-[45px] w-full items-center text-center justify-around shadow-md"
        style={[footerStyle, { position: 'absolute', bottom:1 , height:200}]}>
        <Text className="text-black text-2xl font-bold">Ready to buy?</Text>
        <Text className="text-black text-[15px] font-bold text-center">
          Click the next button to proceed to the next step
        </Text>

        <TouchableOpacity onPress={handleExpandAndNavigate}>
          <Animated.View className="w-[200px] h-[50px] justify-center rounded-lg bg-blue-500 items-center" style={buttonStyle}>
            <Text className="text-white text-lg font-bold">Continue</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
