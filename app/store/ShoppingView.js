import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import SearchBar from '../../components/SearchBar'
import React from 'react'
import '../../global.css'

export default function ShoppingView() {
    return (
        <SafeAreaView className="flex-1 ">
            <View>
                <SearchBar />
            </View>

            <ScrollView>
                <View className="flex-1 justify-between">
                    <View className=" mt-5">
                        <Text className="text-2xl font-bold m-5">Shopping</Text>
                    </View>

                    <View>
                        <Text className="text-lg font-bold">Shopping List</Text>
                    </View>

                    <View>
                        <Text className="text-lg">footer</Text>
                    </View>

                </View>
            </ScrollView>


        </SafeAreaView>
    )
}