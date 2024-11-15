import React from 'react';
import { View, Image } from 'react-native';
import "../global.css"

const BrandsCards = ({imageUrl}) => {
    return (
        <View className=" items-center">
            <Image
                source={{ uri: imageUrl }}
                className="w-28 h-28 rounded-lg" />
        </View>
    );
};

export default BrandsCards;
