import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { items } from '../Database/Database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import red from "../Assets/redwish.jpeg"
const Drawer = createDrawerNavigator();
import cart from "../Assets/CART.png"
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import WishList from './WishList';
import SingleProducts from './SingleProducts';
import MyCartScreen from './MyCartScreen';



export default function App() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0); // State for storing the count of wishlist items
 // AsyncStorage.clear()
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

    const wishList = async (item) => {
    try {
     
      let values = await AsyncStorage.getItem('wishItems');
      let wishItems = values ? JSON.parse(values) : []; 
      console.log(wishItems);
  

      if (wishItems.includes(item)) {
        ToastAndroid.show('Item already exists in wishlist', ToastAndroid.SHORT);
        return; // Exit the function if the item already exists
      }
      wishItems.push(item);
  
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
        aray.push(item);
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

          <TouchableOpacity onPress={() => navigation.navigate("MyCartScreen")} >
            <Image source={cart} style={{ width: 60, height: 50, marginTop: 5 }}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("WishList")}>
            <Text style={styles.countText}>{count}</Text>
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
        <Drawer.Screen name='SingleProducts' component={SingleProducts}/>
        <Drawer.Screen name='MyCartScreen' component={MyCartScreen} options={{headerShown:true}}/>
        <Drawer.Screen name='wishList' component={WishList} options={{headerShown:true}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation, wishList }) => {


  const viewProduct = async (item) => {
    try {
      // Store the selected product in AsyncStorage
      await AsyncStorage.setItem('products', JSON.stringify(item));
  
      // Pass the selected product as a prop when navigating to SingleProducts screen
      navigation.navigate('SingleProducts', { product: item }); // Pass the product as a prop
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>

      <View style={{marginTop: 10, paddingLeft: 20}}>
        <Text style={{color: "black", fontSize: 30, alignSelf: "center"}}>SMART PHONES</Text>
        <SafeAreaView>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => wishList(item)}>
                  <Image source={red} style={styles.icon}/>
                </TouchableOpacity>
                <Image style={styles.image} source={item.productImage}/>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.model}>{item.model}</Text>
                <Text style={styles.price}>₹ {item.price}/-</Text>
                <Text style={styles.description}>{item.descriptions}</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => viewProduct(item)}>
                <Text>View</Text>
                </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor:"#ccf2ff"
  },
  headericons: {
    flexDirection: 'row',
  },
  countText: {
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 60,
    backgroundColor: "red",
    color: "white",
  },
  itemContainer: {
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
    elevation: 4,
    marginLeft:-0.6
  },
  icon: {
    width: 25,
    height: 20,
    marginLeft: 90,
    padding: 5,
    marginTop: 10,
    backgroundColor: "#F0F8FF",
  },
  image: {
    width: 100,
    height: 100,
  },
  category: {
    color: "black",
    fontWeight: "bold",
  },
  model: {
    color: "black",
  },
  price: {
    color: "green",
  },
  description: {
    color: "black",
    padding: "1%",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  btn:{
    borderWidth:1,
    width:50,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    backgroundColor:"#ccf2ff"
  }
});
