import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import '../global.css'

export default function test() {
  return (
    <SafeAreaView className='flex-1'>
      <View>
        <Text className='text-4xl font-bold'>test</Text>
      </View>

      <View>
        <Text>
          This is the Middle part
        </Text>
      </View>

      <View>
        <Text>This is the bottom part</Text>
      </View>
    </SafeAreaView>

  )
}