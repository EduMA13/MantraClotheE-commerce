import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import FindStore from './FindStore';
import ShoppingCart from './ShoppingCart';
import ShoppingView from './ShoppingView';
import ItemScreen from './ItemView';
import InfoCheck from '../payment/InfoCheck';
import ProfileSettings from '../user/ProfileSettings';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from "@stripe/stripe-react-native";


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
    <StripeProvider publishableKey='pk_test'>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{
          animation: 'slide_from_left',
          gestureEnabled: false
        }} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
        <Stack.Screen name="InfoCheck" component={InfoCheck} />
        <Stack.Screen name="Profile" component={ProfileSettings}/>

      </Stack.Navigator>
    </StripeProvider>

  );
}

export default MainMenu;
