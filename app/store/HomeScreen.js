import { View, Text, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CardNew from '../../components/CardNew';
import ClotheNav from '../../components/ClotheNav';
import BrandsCards from '../../components/BrandsCards';
import SearchBar from '../../components/SearchBar';
import '../../global.css'

export default function HomeScreen({ navigation }) {
    const imageUrls = [
        'https://nikecompanyblog.wordpress.com/wp-content/uploads/2015/05/nike1.jpg',
        'https://abscents.com.mx/cdn/shop/products/GUCCI_71dc7fa3-43cb-4d9d-afe7-3c102344ece7.jpg?v=1711913492&width=1080',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAgXpCthsqqJRegBOjjF06zsimdNbZ6P5E6g&s',

    ];
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="flex-1">

                    <View className="mt-5 mb-5">
                        <Text className="text-3xl font-bold ml-[23px]">Categories</Text>
                    </View>

                    {/* ScrollView horizontal para categorías */}
                    <ScrollView
                        horizontal
                        className="p-4"
                        contentContainerStyle={{ flexDirection: "row" }}
                        showsHorizontalScrollIndicator={false}>
                        <ClotheNav
                            imageUrl="https://m.media-amazon.com/images/I/81iJvmMoF8L._AC_UF894,1000_QL80_.jpg"
                            title="Pants" />
                        <ClotheNav
                            imageUrl="https://m.media-amazon.com/images/I/71J3zo5sGlL._AC_UY1000_.jpg"
                            title="Shirts" />
                        <ClotheNav
                            imageUrl="https://m.media-amazon.com/images/I/81TIxHKfydL._AC_UF894,1000_QL80_.jpg"
                            title="Sweaters" />

                        <ClotheNav
                            imageUrl="https://baccabucci.com/cdn/shop/files/IMG_9335-min.jpg?v=1695364953"
                            title="Shoes" />
                        <ClotheNav
                            imageUrl="https://www.enibbana.com/cdn/shop/articles/1PEKSTI.png?v=1669712803&width=2048"
                            title="Accesories" />
                    </ScrollView>

                    <View className="mt-5">
                        <Text className="text-2xl font-bold ml-[23px]">New Arrivals</Text>
                    </View>

                    <ScrollView
                        horizontal
                        className="flex-row p-4"
                        showsHorizontalScrollIndicator={false}
                    >
                        <View className="flex flex-row gap-10">
                            <CardNew
                                imageUrl="https://aispi.co/wp-content/uploads/2022/02/shopping.jpeg"
                                title="Titulo de ejemplo"
                                description="Descripción de ejemplo"
                            />

                            <CardNew
                                imageUrl="https://media.vogue.mx/photos/5d8128d1c147f70008ba0149/master/w_1600%2Cc_limit/Shopping-amigas.jpg"
                                title="Titulo de ejemplo"
                                description="Descripción de ejemplo"
                            />

                            <CardNew
                                imageUrl="https://i0.wp.com/cms.babbel.news/wp-content/uploads/2018/09/ClothesShopping.png?fit=1201%2C676&strip=none&ssl=1"
                                title="Titulo de ejemplo"
                                description="Descripción de ejemplo"
                            />
                        </View>

                    </ScrollView>

                    <View className="mt-5">
                        <Text className="text-2xl font-semibold ml-[23px]">Most Popular</Text>
                        <View className="justify-center items-center shadow-md">
                            <View className="mt-5 justify-evenly rounded-md w-[380px] bg-[#b6c3c9] items-center flex flex-row">
                                <View className="justify-center items-start p-10 gap-y-5">
                                    <Text className="text-lg font-bold w-[120px]">Best style at best prices</Text>
                                    <Text className="">Min. 25% off</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Items')}>
                                        <View className="bg-blue-500 p-5 rounded-md" >
                                            <Text className="text-white font-bold">Start Shooping!</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Image
                                    source={require("../../assets/shop/women_looking.png")}
                                    className="w-52 h-52 rounded-lg"></Image>

                            </View>
                        </View>

                    </View>

                    <View className="mt-5">
                        <Text className="text-2xl font-semibold ml-[23px]">Brands</Text>

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
            </ScrollView>


        </SafeAreaView>


    )
}