import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import "../global.css"

const CardNew = ({ imageUrl, title, description }) => {
  const navigation = useNavigation();

  return (
    <View className="w-[300px] rounded-lg shadow-sm bg-white">
      <Image
        className="w-full h-48 rounded-t-lg"
        source={{ uri: imageUrl }}
        alt="Image"
      />
      <View className="px-6 py-4">
        <Text className="font-bold text-xl mb-2 text-gray-900">{title}</Text>
        <Text className="text-gray-700 text-base">{description}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Items')}>
        <View className="px-6 pt-4 pb-2 flex-row flex-wrap">
          <Text className="underline text-blue-500 text-md">Go shopping</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default CardNew;
