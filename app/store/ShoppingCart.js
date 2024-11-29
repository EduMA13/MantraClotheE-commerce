import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Button } from 'react-native'
import BrandsCards from '../../components/BrandsCards'
import { CartContext } from '../../components/CartContext';

import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ShoppingCart() {
  const imageUrls = [
    'https://nikecompanyblog.wordpress.com/wp-content/uploads/2015/05/nike1.jpg',
    'https://abscents.com.mx/cdn/shop/products/GUCCI_71dc7fa3-43cb-4d9d-afe7-3c102344ece7.jpg?v=1711913492&width=1080',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAgXpCthsqqJRegBOjjF06zsimdNbZ6P5E6g&s',

  ];

  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigation = useNavigation(); // Usa useNavigation para navegar

  //Cálculo del producto
  const TAX_RATE = 0.16;
  const SHIPPING_RATE = 0.03;
  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.precio) * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const shipping = (subtotal + tax) * SHIPPING_RATE;
  const total = subtotal + tax + shipping;



  return (

    <SafeAreaView className="flex-1">
      {cart.length === 0 ? (
        <View className="flex-1 justify-between">
          <View className="m-5">
            <Text className="text-4xl font-bold">Shopping Cart</Text>
          </View>
          <View className="justify-center items-center">
            <View className="justify-center items-center bg-white rounded-lg h-96 w-96 shadow-md">
              <Image source={require('../../assets/shop/no_items.png')} />
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
        </View>


      ) : (
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-4xl font-bold m-5">Shopping Cart</Text>
          </View>

          <ScrollView className="">
            {cart.map((item, index) => (
              <View className="justify-center items-center">
                <View key={index} className="flex-row justify-between p-4 bg-white shadow-sm w-[380px] items-center rounded-lg mb-5 ">
                  <Image
                    source={{ uri: item.imagen }}
                    className="w-20 h-20 rounded-lg"
                  />
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-bold">{item.nombre}</Text>
                    <Text className="text-sm">Talla: {item.talla}</Text>
                    <Text className="text-sm">Cantidad: {item.quantity}</Text>
                    <Text className="text-sm">Color: {item.color}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text className="text-red-500">Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>

            ))}
          </ScrollView>

          <View className=" justify-center items-center">
            <View className="p-4 bg-white rounded-md shadow-md justify-center items-center w-96 ">
              <Text className="text-xl">Subtotal: ${subtotal.toFixed(2)} USD</Text>
              <Text className="text-xl">Impuestos (16%): ${tax.toFixed(2)}</Text>
              <Text className="text-xl">Envío: ${shipping.toFixed(2)} USD</Text>
              <Text className="text-xl font-bold">Total: ${total.toFixed(2)} USD</Text>
            </View>
          </View>

          <View className="justify-center items-center m-5">
            <TouchableOpacity onPress={() => navigation.navigate('InfoCheck', { cart, subtotal, tax, shipping, total })}>
              <View className="bg-blue-500 rounded-md p-5">
                <Text className="text-bold text-white">
                  Proceed to checkout
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      )}
    </SafeAreaView>


  )
}