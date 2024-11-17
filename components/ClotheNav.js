import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import "../global.css"

const CardNew = ({ imageUrl, title }) => {
    return (

        <View className=" flex flex-col w-28 h-28 gap-y-4 rounded-full justify-center items-center mx-2">
            <TouchableOpacity>
                <Image
                    className="w-28 h-28 rounded-full "
                    source={{ uri: imageUrl }}
                    alt="Image"
                />
            </TouchableOpacity>
            <View>
                <Text className="text-center font-semibold ">{title}</Text>
            </View>
        </View>

    );
};

export default CardNew;
