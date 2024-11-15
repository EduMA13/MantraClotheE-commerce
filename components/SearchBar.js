import React from 'react';
import { TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import "../global.css"

const SearchBar = () => {
    return (
        <View className="justify-center items-center">
            <View className="flex flex-row items-center w-[350px] gap-x-10 shadow-md rounded-lg bg-white h-14">
                <FontAwesome className="ml-5" name="search" size={24} color="black" />
                <TextInput placeholder="Search for any clothes" />
            </View>
        </View>
    );
};

export default SearchBar;
