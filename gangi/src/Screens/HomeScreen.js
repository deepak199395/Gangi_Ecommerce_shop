import { Alert, Button, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { items } from '../Database/Database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import red from "../Assets/redwish.jpeg"
const Drawer = createDrawerNavigator();
import cart from "../Assets/CART.png"
import Profile from './Profile';
import SideMenu from '../Components/SideMenu';
import Settings from './Settings';
import Faq from './Faq';
import Legal from './Legal';
import ContactsUs from './ContactsUs';
import search from '../Assets/search.jpeg';
import icons from "../Assets/widjlist.jpeg"
import { useNavigation } from '@react-navigation/native';
import TrackOrder from './TrackOrder';
import Blog from './Blog';
import SocialIcons from '../Components/SocialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0); // State for storing the count of wishlist items

  useEffect(() => {
    const getCount = async () => {
      try {
        const values = await AsyncStorage.getItem('wishItems');
        const wishItems = values ? JSON.parse(values) : [];
        setCount(wishItems.length); // Set the count state to the length of wishItems array
      } catch (error) {
        console.log(error);
      }
    };
  
    getCount(); // Call the function to retrieve the count when the component mounts or updates
  }, []); // Empty dependency array ensures that the effect runs only once after the component mounts
  const wishList = async (id) => {
    try {
     
      let values = await AsyncStorage.getItem('wishItems');
      let wishItems = values ? JSON.parse(values) : []; 
      console.log(wishItems);
  

      if (wishItems.includes(id)) {
        ToastAndroid.show('Item already exists in wishlist', ToastAndroid.SHORT);
        return; // Exit the function if the item already exists
      }
      wishItems.push(id);
  
      if (wishItems.length > 0) {
        try {
          await AsyncStorage.setItem('wishItems', JSON.stringify(wishItems));
          setCount(count + 1); // Increment count when an item is added to the wishlist

          ToastAndroid.show('Item Added successfully to wishlist', ToastAndroid.SHORT);
        } catch (error) {
          console.log(error);
        }
      } else {
        let aray = [];
        aray.push(id);
        try {
          await AsyncStorage.setItem('wishItems', JSON.stringify(aray));
          setCount(1)
          ToastAndroid.show('Item Added successfully to wishlist', ToastAndroid.SHORT);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator  drawerContent={(props) => <SideMenu {...props}/>}>
      
      <Drawer.Screen name="homeScreen"  options={{headerRight: () => (
        <View style={styles.headericons}>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} >
            <Image source={cart} style={{ width: 60, height: 50, marginTop: 5 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("WishList")}>
          <Text style={{ marginLeft:20,borderWidth:1,borderRadius:60,backgroundColor:"black",color:"white"}}>{count}</Text>

            <Image source={icons} style={{ width: 27, height: 25, marginTop: 0 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SearchBar")}>
            <Image source={search} 
            style={{ width: 27, height: 25, marginTop: 20, marginLeft: 15, marginRight: 10 }}/>
          </TouchableOpacity>
        </View>
      )}} >
        {props => <HomeScreen {...props} wishList={wishList} />}
      </Drawer.Screen>
        <Drawer.Screen name='Settings' component={Settings}/>
        <Drawer.Screen name='Legal' component={Legal}/>
        <Drawer.Screen name='ContactsUs' component={ContactsUs}/>
        <Drawer.Screen name='Track Order' component={TrackOrder}/>
        <Drawer.Screen name='Blog' component={Blog}/>
        <Drawer.Screen name='Faq' component={Faq} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation, wishList }) => {
  return (
    <View style={styles.container}>

      <View style={{marginTop: 10, paddingLeft: 20}}>
        <Text style={{color: "black", fontSize: 30, alignSelf: "center"}}>SMART PHONES</Text>
        <SafeAreaView>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <View style={styles.container}>
                <TouchableOpacity onPress={() => wishList(item.id)}>
                  <Image source={red} style={{width: 25, height: 20, marginLeft: 90, padding: 5, 
                       marginTop: 10, backgroundColor: "#F0F8FF"}}/>
                </TouchableOpacity>
                <Image style={{width: 100, height: 100}} source={item.productImage}/>
                <Text style={{color: "black", fontWeight: "bold"}}>{item.category}</Text>
                <Text style={{color: "black"}}>{item.model}</Text>
                <Text style={{color: "green"}}> ₹ {item.price}/-</Text>
                <Text style={{color: "black", padding: "1%"}}>{item.descriptions}</Text>
                <View style={{marginBottom: 10}}>
                  <Button title='BAY NOW' />
                </View>
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  
  );
}

const styles = StyleSheet.create({
  
    text:{
        textAlign:"center",
        fontSize:30,
        color:"black",
        fontWeight:"900",
        backgroundColor:"white",
        height:60,
        marginTop:15,
        justifyContent:"center",
    },
    container:{
      alignItems:"center",
      borderWidth:0.5,
      marginTop:5,
      borderRadius:10,
      backgroundColor:"white",
      margin:5,
      elevation: 4,
    },
    btncontainer:{
      borderWidth:1,
      width:50,
      height:30,
      marginBottom:5,
      borderRadius:5
    },
    headericons:{
      flexDirection:"row"
    },
});

