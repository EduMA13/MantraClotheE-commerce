import React from 'react'
import { Text, View } from 'react-native'
import "../global.css"
function Button() {
    return (
        <View className="flex justify-center items-center rounded-md w- h-[120px] bg-white">
            <Text className="text-5xl font-semibold text-black w-auto">
                Test de botón
            </Text>
        </View>

    )
}

export default Button