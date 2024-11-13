import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Tu pantalla principal
import FindStore from './FindStore';
import ShoppingCart from './ShoppingCart';
import "../../global.css"

const Tab = createBottomTabNavigator();

function MainMenu() {
  return (

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f62b56",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={FindStore} />
        <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      </Tab.Navigator>

  );
}

export default MainMenu;
