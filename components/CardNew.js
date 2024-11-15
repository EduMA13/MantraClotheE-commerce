import React from 'react';
import { View, Text, Image } from 'react-native';
import "../global.css"

const CardNew = ({ imageUrl, title, description }) => {
  return (
    <View className="max-w-sm rounded-lg shadow-sm bg-white">
    <Image
      className="w-full h-48 rounded-t-lg"
      source={{ uri: imageUrl }}
      alt="Image"
    />
    <View className="px-6 py-4">
      <Text className="font-bold text-xl mb-2 text-gray-900">{title}</Text>
      <Text className="text-gray-700 text-base">{description}</Text>
    </View>
    <View className="px-6 pt-4 pb-2 flex-row flex-wrap">
      <Text className="underline text-blue-500 text-md">Go shopping</Text>
    </View>
  </View>
  );
};

export default CardNew;
