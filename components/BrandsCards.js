import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import "../global.css"

const BrandsCards = ({ imageUrl }) => {
    return (
        <TouchableOpacity>
            <View className="items-center">
                <View className="w-24 h-24 bg-white shadow-md rounded-lg items-center justify-center">
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-20 h-20" />
                </View>

            </View>
        </TouchableOpacity>

    );
};

export default BrandsCards;
