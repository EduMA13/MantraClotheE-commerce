import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import '../../global.css'
import { CardField, StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";


const API_URL = "http://192.168.1.31:3000";


export default function InfoCheck({ route, navigation }) {
  const { cart, subtotal, tax, shipping, total } = route.params;
  const [isAddingAddress, setIsAddingAddress] = useState(false); // Para mostrar/ocultar el campo de entrada
  const [newAddress, setNewAddress] = useState(''); // Para almacenar la nueva dirección escrita
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();


  const fetchPaymentIntentClientSecret = async () => {
    const roundedTotal = Math.round(total*100);
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: roundedTotal,

      }),

    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
  
    const billingDetails = {
      email: email,
    };
  
    try {
      // Calcula el total, por ejemplo, a partir de los productos en el carrito
      const total = total; // Asegúrate de definir esta función o variable
      
      // Fetch the client secret from the backend
      const { clientSecret, error } = await fetchPaymentIntentClientSecret(total);
  
      if (error) {
        console.log("Error fetching client secret:", error);
        return;
      }
  
      // Confirm the payment
      const { paymentIntent, error: confirmError } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card", // Asegúrate de que esto sea 'card' en minúscula
        billingDetails: billingDetails,
      });
  
      if (confirmError) {
        console.log(`Payment Confirmation Error: ${confirmError.message}`);
        Alert.alert(`Payment Confirmation Error: ${confirmError.message}`);
      } else if (paymentIntent) {
        console.log("Payment successful", paymentIntent);
        Alert.alert("Payment Successful");
      }
    } catch (error) {
      console.log("Error in handlePayPress:", error);
    }
  };
  


  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleConfirmOrder = () => {
    // Aquí puedes enviar los datos del pedido al backend
    alert('Order confirmed!');
    navigation.navigate('OrderSummary'); // Navega al resumen del pedido
  };

  return (
    <SafeAreaView className="flex-1 justify-between">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold mb-4">Checkout</Text>

        {/* Dirección de envío */}
        <View className="mb-6">
          <Text className="text-xl font-semibold">Shipping Address</Text>

          {/* Lista de direcciones */}
          {addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedAddress(address)}
              className={`p-4 border rounded-md mt-2 ${selectedAddress === address ? 'border-blue-500' : 'border-gray-300'
                }`}
            >
              <Text>{address}</Text>
            </TouchableOpacity>
          ))}

          {/* Botón para agregar nueva dirección */}
          {isAddingAddress ? (
            <View className="mt-2">
              <TextInput
                className="border p-2 rounded-md mb-2"
                placeholder="Enter new address"
                value={newAddress}
                onChangeText={setNewAddress}
              />
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => {
                    if (newAddress.trim()) {
                      setAddresses([...addresses, newAddress.trim()]);
                      setNewAddress('');
                      setIsAddingAddress(false);
                    } else {
                      alert('Please enter a valid address.');
                    }
                  }}
                  className="bg-green-500 p-2 m-2  rounded-md flex-1"
                >
                  <Text className="text-white text-center">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setNewAddress('');
                    setIsAddingAddress(false);
                  }}
                  className="bg-gray-400 p-2 m-2 rounded-md flex-1"
                >
                  <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsAddingAddress(true)}
              className="mt-2 bg-gray-200 p-2 rounded-md"
            >
              <Text>Add New Address</Text>
            </TouchableOpacity>
          )}
        </View>



        {/* Métodos de pago */}
        <StripeProvider publishableKey='pk_test_51QBJcDFHIk1Q2JBGH3RRnWpxmDqNqD1ZYXfZhsp8z7S4TfV9XvxkggfL6c9HDIzU8EsKLr4oYsCoE6ayGxKiEtp400Oz6L2maP'>
          <View style={{ padding: 20 }}>
            <Text className="text-xl font-semibold">Payment Method</Text>

            <TouchableOpacity
              onPress={() => setPaymentMethod('Credit/Debit Card')}
              className={`p-4 border rounded-md mt-2 ${paymentMethod === 'Credit/Debit Card' ? 'border-blue-500' : 'border-gray-300'
                }`}
            >
              <Text>Credit/Debit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPaymentMethod('PayPal')}
              className={`p-4 border rounded-md mt-2 ${paymentMethod === 'PayPal' ? 'border-blue-500' : 'border-gray-300'
                }`}
            >
              <Text>PayPal</Text>
            </TouchableOpacity>

            {paymentMethod === 'Credit/Debit Card' && (
              <View style={{ marginTop: 20 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                />
                <CardField
                  postalCodeEnabled={true}
                  placeholder={{ number: '4242 4242 4242 4242' }}
                  cardStyle={styles.card}
                  style={styles.cardContainer}
                  onCardChange={setCardDetails}
                />
              </View>
            )}
          </View>
        </StripeProvider>


        {/* Código de descuento */}
        <View className="mb-6">
          <Text className="text-xl font-semibold">Discount Code</Text>
          <TextInput
            className="border p-2 rounded-md mt-2"
            placeholder="Enter discount code"
            value={discountCode}
            onChangeText={setDiscountCode}
          />
          <TouchableOpacity onPress={applyDiscount} className="mt-2 bg-blue-500 p-2 rounded-md">
            <Text className="text-white">Apply Discount</Text>
          </TouchableOpacity>
          {discountApplied && <Text className="text-green-500 mt-2">Discount applied!</Text>}
        </View>

        {/* Resumen del pedido */}
        <View className="mb-6">
          <Text className="text-xl font-semibold">Order Summary</Text>
          {cart.map((item, index) => (
            <View key={index} className="flex-row justify-between mt-2">
              <Text>{item.nombre} (x{item.quantity})</Text>
              <Text>${(item.precio * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View className="flex-row justify-between mt-4">
            <Text>Subtotal:</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Tax (16%):</Text>
            <Text>${tax.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Shipping:</Text>
            <Text>${shipping.toFixed(2)}</Text>
          </View>
          {discountApplied && (
            <View className="flex-row justify-between">
              <Text>Discount:</Text>
              <Text>-${(total * 0.1).toFixed(2)}</Text>
            </View>
          )}
          <View className="flex-row justify-between font-bold mt-2">
            <Text>Total:</Text>
            <Text>${(discountApplied ? total * 0.9 : total).toFixed(2)}</Text>
          </View>
        </View>

        {/* Confirmación */}
        <TouchableOpacity
          onPress={handlePayPress}
          className="bg-[#f52c56] p-4 rounded-md"
        >
          <Text className="text-white text-center">Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});