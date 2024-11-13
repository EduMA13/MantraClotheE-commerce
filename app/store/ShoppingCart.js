import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import React from 'react'
import CardNew from '../../components/CardNew'

export default function ShoppingCart() {

  const cardsData = [
    {
      imageUrl: 'https://placekitten.com/400/400',
      title: 'The Coldest Sunset',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
     
    },
    {
      imageUrl: 'https://placekitten.com/500/500',
      title: 'Winter Wonderland',
      description: 'Quisquam ratione, laboriosam error natus, expedita!',
   
    },
    {
      imageUrl: 'https://placekitten.com/600/600',
      title: 'Golden Hour',
      description: 'Aliquid omnis fuga. Lorem ipsum dolor sit amet.',
    
    },
  ];

  return (

    <SafeAreaView>

 
        <View className=" flex flex-row gap-6">
          {cardsData.map((card, index) => (

            <CardNew
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
          
            />
          ))}
        </View>

   

    </SafeAreaView>


  )
}