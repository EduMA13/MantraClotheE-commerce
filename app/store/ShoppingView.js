import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

export default function ShoppingView() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const navigation = useNavigation(); // Usa useNavigation para navegar

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://My.ip.here:3000/productos');
            const data = await response.json();
            setProductos(data);
            setFilteredProductos(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleSearch = (query) => {
        if (!query) {
            setFilteredProductos(productos); // Si no hay query, mostrar todos los productos
        } else {
            const queryLower = query.toLowerCase();
    
            // Filtrado de productos basado en los diferentes campos
            const filtered = productos.filter((producto) => {
                // Filtro por nombre
                const matchesName = producto.nombre.toLowerCase().includes(queryLower);
    
                // Filtro por categoría
                const matchesCategory = producto.categoria.toLowerCase().includes(queryLower);
    
                // Filtro por etiquetas
                const matchesTags = producto.etiquetas
                    ? producto.etiquetas.toLowerCase().includes(queryLower)
                    : false;
    
                // Filtro por colores (si el color está en el JSON de colores)
                const matchesColors = producto.colores
                    ? JSON.parse(producto.colores).some(color =>
                          color.toLowerCase().includes(queryLower)
                      )
                    : false;
    
                // Filtro por tallas (si la talla está en el JSON de tallas)
                const matchesSizes = producto.tallas
                    ? JSON.parse(producto.tallas).some(size =>
                          size.toLowerCase().includes(queryLower)
                      )
                    : false;
    
                // Filtro por precio (si el precio es un número y coincide con el query)
                const matchesPrice = !isNaN(query) && producto.precio === parseFloat(query);
    
                // Devuelve true si cualquier filtro coincide
                return (
                    matchesName ||
                    matchesCategory ||
                    matchesTags ||
                    matchesColors ||
                    matchesSizes ||
                    matchesPrice
                );
            });
    
            setFilteredProductos(filtered); // Actualizamos el estado con los productos filtrados
        }
    };
    
    const renderItem = ({ item }) => {
        const tallas = JSON.parse(item.tallas); // Convertir JSON a array

        return (
            <TouchableOpacity  onPress={() => navigation.navigate('ItemScreen', { productId: item.id })} >
                <View className="mb-4 mr-3 bg-white rounded-lg shadow-sm ">
                    <View className="p-3 w-52 h-72">
                        <View className="items-center justify-center ">
                            <Image
                                source={{ uri: item.portada }}
                                className="w-40 h-40 rounded-lg"
                            />
                        </View>
                        <Text className="mt-3 text-lg font-bold">{item.nombre}</Text>
                        <Text className="text-green-500 text-base font-semibold mt-1">${item.precio}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        );
    };


    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="px-4">
                <SearchBar onSearch={handleSearch} />
            </View>

            <View className="mt-6 px-4">
                <Text className="text-2xl font-bold mb-4">Shopping</Text>
            </View>

            <FlatList
                data={filteredProductos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Muestra 2 columnas
                contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'center' }}
                className="gap-4"
            />
        </SafeAreaView>
    );
}
