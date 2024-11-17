import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import BrandsCards from '../../components/BrandsCards'
import React from 'react'

export default function ShoppingCart() {
  const imageUrls = [
    'https://nikecompanyblog.wordpress.com/wp-content/uploads/2015/05/nike1.jpg',
    'https://abscents.com.mx/cdn/shop/products/GUCCI_71dc7fa3-43cb-4d9d-afe7-3c102344ece7.jpg?v=1711913492&width=1080',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAgXpCthsqqJRegBOjjF06zsimdNbZ6P5E6g&s',

  ];

  return (

    <SafeAreaView className="flex-1 justify-between">
      <View className='justify-center items-start m-5'>
        <Text className='text-4xl font-bold'>Shopping Cart</Text>
      </View>

      <View className="justify-center items-center">
        <View className='justify-center items-center shadow-md rounded-lg bg-white w-96 p-10'>
          <Image
            source={require('../../assets/shop/no_items.png')} />

          <Text className="text-2xl font-semibold text-center">Hey, it feels so light!</Text>
          <Text>There's nothing in your shopping cart.</Text>
        </View>

      </View>


      <View>
        <Text className="text-3xl font-bold m-5">Check out this brands!</Text>
        <View className="mt-5">
          <View className="justify-center items-center shadow-md ">
            <View className="flex flex-wrap flex-row justify-center p-4">
              {imageUrls.map((url, index) => (
                <View key={index} className="w-1/3 p-2">
                  <BrandsCards imageUrl={url} />
                </View>
              ))}
            </View>
          </View>
        </View>

      </View>

    </SafeAreaView>


  )
}