import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ItemScreen({ route }) {
    const navigation = useNavigation();
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isZoomModalVisible, setIsZoomModalVisible] = useState(false); // State for the zoom modal

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://192.168.1.32:3000/productos/${productId}`);
            const data = await response.json();
            const firstImage = JSON.parse(data.imagenes);

            setProduct(data);
            setSelectedColor(data.colores[0]);
            setSelectedImage(firstImage[0]);
            setSelectedSize(data.tallas[0]);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        const colorIndex = product.colores.indexOf(color);
        setSelectedImage(JSON.parse(product.imagenes)[colorIndex]);
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const toggleFavorite = () => setIsFavorite(!isFavorite);
    const paymentItem = () => navigation.navigate('Payment');

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg font-bold">No se encontró el producto</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1">
                {/* Zoom Modal */}
                <Modal visible={isZoomModalVisible} transparent={true} onRequestClose={() => setIsZoomModalVisible(false)}>
                    <ImageViewer
                        imageUrls={[{ url: selectedImage }]} // Pass the image to zoom
                        enableSwipeDown={true} // Allow swiping down to close
                        onSwipeDown={() => setIsZoomModalVisible(false)}
                    />
                </Modal>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="p-2">
                        {/* Main Image with zoom functionality */}
                        <TouchableOpacity onPress={() => setIsZoomModalVisible(true)}>
                            <Image
                                source={{
                                    uri: selectedImage,
                                }}
                                className="w-full h-[500px] object-contain mb-4 rounded-lg"
                            />
                        </TouchableOpacity>

                        {/* Product Details */}
                        <View className="flex flex-row justify-between p-5">
                            <Text className="text-3xl font-bold mb-2">{product.nombre}</Text>
                            <TouchableOpacity onPress={toggleFavorite}>
                                <Icon
                                    name={isFavorite ? 'heart' : 'heart-o'}
                                    size={30}
                                    color={isFavorite ? '#f52c56' : '#f52c56'}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Colors */}
                        <View className="p-5 justify-between flex-row">
                            <Text className="text-2xl font-bold mb-2 italic">Color</Text>
                            <View className="flex flex-row gap-2">
                                {product.colores.map((color) => (
                                    <TouchableOpacity key={color} onPress={() => handleColorChange(color)}>
                                        <View
                                            className={`w-10 h-10 rounded-full border-2 ${
                                                selectedColor === color ? 'border-[#f52c56]' : 'border-gray-300'
                                            }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Sizes */}
                        <View className="p-5">
                            <Text className="text-2xl font-bold mb-2 italic">Size</Text>
                            <FlatList
                                horizontal
                                data={product.tallas}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => setSelectedSize(item)}>
                                        <View
                                            className={`px-4 py-2 border-2 mr-2 ${
                                                selectedSize === item ? 'border-[#f52c56]' : 'border-gray-300'
                                            } rounded-lg`}
                                        >
                                            <Text className={`${selectedSize === item ? 'font-bold' : ''}`}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        {/* Description */}
                        <View className="p-5">
                            <Text className="text-2xl italic font-bold">Description</Text>
                            <Text className="text-[15px] mt-4">{product.descripcion}</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Purchase Button */}
                <TouchableOpacity>
                    <View className="absolute bottom-0 left-[20px] right-[40px] w-96 h-16 mb-6 ml-4 rounded-lg shadow-md">
                        <View className="flex justify-center items-center bg-[#f52c56] rounded-lg h-16">
                            <Text onPress={paymentItem} className="text-white font-semibold">
                                $ {product.precio} USD
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
