import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'; 
import FindStore from './FindStore';
import ShoppingCart from './ShoppingCart';
import ShoppingView from './ShoppingView';
import ItemScreen from './ItemView';
import { createStackNavigator } from '@react-navigation/stack';
import "../../global.css";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f62b56",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Items') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Find Store') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Shopping Cart') {
            iconName = focused ? 'bag-handle' : 'bag-handle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Items" component={ShoppingView} />
      <Tab.Screen name="Find Store" component={FindStore} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
    </Tab.Navigator>
  );
}

function MainMenu() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      
    </Stack.Navigator>
  );
}

export default MainMenu;
