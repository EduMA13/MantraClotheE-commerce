import { View, Text, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CardNew from '../../components/CardNew';
import '../../global.css'
export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1">
            <View className="justify-center items-center">
                <View className="flex flex-row items-center w-[350px] gap-x-10 shadow-md rounded-lg bg-white h-14">
                    <FontAwesome className="ml-5" name="search" size={24} color="black" />
                    <TextInput placeholder="Search for any clothes" />
                </View>
            </View>

            <ScrollView>
                <View className="flex-1">

                    <View className="mt-5">
                        <Text className="text-3xl font-bold ml-[23px]">Categories</Text>
                    </View>

                    {/* ScrollView horizontal para categorías */}
                    <ScrollView
                        horizontal
                        className="p-4"
                        contentContainerStyle={{ flexDirection: "row" }}
                        showsHorizontalScrollIndicator={false}>
                        <View className="w-36 h-36 bg-red-500 rounded-full justify-center items-center mx-2">
                            <Text className="text-white text-lg font-bold">Elemento 1</Text>
                        </View>
                        <View className="w-36 h-36 bg-blue-500 rounded-full justify-center items-center mx-2">
                            <Text className="text-white text-lg font-bold">Elemento 2</Text>
                        </View>
                        <View className="w-36 h-36 bg-green-500 rounded-full justify-center items-center mx-2">
                            <Text className="text-white text-lg font-bold">Elemento 3</Text>
                        </View>
                        <View className="w-36 h-36 bg-orange-500 rounded-full justify-center items-center mx-2">
                            <Text className="text-white text-lg font-bold">Elemento 4</Text>
                        </View>
                        <View className="w-36 h-36 bg-purple-500 rounded-full justify-center items-center mx-2">
                            <Text className="text-white text-lg font-bold">Elemento 5</Text>
                        </View>
                    </ScrollView>

                    <View className="mt-5">
                        <Text className="text-2xl font-bold ml-[23px]">New Arrivals</Text>
                    </View>

                    <ScrollView
                        horizontal
                        className="flex-row p-4"
                        showsHorizontalScrollIndicator={false}
                    >
                  
                    <CardNew
                    imageUrl="https://aispi.co/wp-content/uploads/2022/02/shopping.jpeg"
                    title="se hace la que no me conoce"
                    description="remix"
                    />
                    </ScrollView>

                    <View className="mt-5">
                        <Text className="text-2xl font-semibold ml-[23px]">Most Popular</Text>
                    </View>

                    <View className="mt-5">
                        <Text className="text-2xl font-semibold ml-[23px]">Brands</Text>
                    </View>



                </View>
            </ScrollView>


        </SafeAreaView>


    )
}