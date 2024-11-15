import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'; 
import FindStore from './FindStore';
import ShoppingCart from './ShoppingCart';
import "../../global.css";

const Tab = createBottomTabNavigator();

function MainMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f62b56",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        // Define iconos y colores
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Shopping Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF', 
        tabBarInactiveTintColor: '#FFFFFF', 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={FindStore} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
    </Tab.Navigator>
  );
}

export default MainMenu;
