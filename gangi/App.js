import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-reanimated';

import LoginScreen from './src/Screens/LoginScreen';
import SplishScreen from './src/Screens/SplishScreen';
import HomeScreen from './src/Screens/HomeScreen';
import cart from "../gangi/src/Assets/CART.png"
import WishList from './src/Screens/WishList';
import CartScreen from './src/Screens/CartScreen';
import SearchBar from './src/Screens/SearchBar';
import Blog from './src/Screens/Blog';
import TrackOrder from './src/Screens/TrackOrder';

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='homeScreen'>
        <Stack.Screen name='SplishScreen' component={SplishScreen} options={{ headerShown: false }} />
        <Stack.Screen name='loginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='homeScreen' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='WishList' component={WishList}/>
        <Stack.Screen name='CartScreen' component={CartScreen}/>
        <Stack.Screen name='SearchBar' component={SearchBar}/>
        <Stack.Screen name='Blog' component={Blog}/>
        <Stack.Screen name='TrackOrder' component={TrackOrder}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({});
