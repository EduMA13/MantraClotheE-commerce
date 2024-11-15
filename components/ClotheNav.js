import React from 'react';
import { View, Text, Image } from 'react-native';
import "../global.css"

const CardNew = ({ imageUrl, title }) => {
    return (
        <View className=" flex flex-col w-28 h-28 gap-y-4 rounded-full justify-center items-center mx-2">
            <Image
                className="w-28 h-28 rounded-full "
                source={{ uri: imageUrl }}
                alt="Image"
            />

            <View>
                <Text className="text-center font-semibold ">{title}</Text>
            </View>
        </View>
        
    );
};

export default CardNew;
