import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View className="justify-center items-center">
            <View className="flex flex-row items-center w-[350px] shadow-md rounded-lg bg-white h-16 px-4">
                <FontAwesome name="search" size={24} color="black" />
                <TextInput
                    className="ml-3 flex-1 text-base"
                    placeholder="Search for any clothes"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
        </View>
    );
};

export default SearchBar;
