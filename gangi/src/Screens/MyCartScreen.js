import React, { useEffect, useState } from 'react';
import arrow from "../Assets/backArrow.jpeg";
import home from "../Assets/home.jpeg"
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCartScreen = ({ navigation }) => {
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cartItem();
    });
    return unsubscribe;
  }, [navigation]);

  const cartItem = async () => {
    let vals = await AsyncStorage.getItem('productsItem');
    let Data = JSON.parse(vals);
    // Initialize count for each product
    let updatedData = Data.map(item => ({ ...item, count: 1 }));
    setCartData(updatedData);
  };

  const removeFromCart = async (itemToRemove) => {
    try {
      let updatedCartData = cartdata.filter(item => item !== itemToRemove);
      await AsyncStorage.setItem('productsItem', JSON.stringify(updatedCartData));
      setCartData(updatedCartData);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementCount = (index) => {
    setCartData(prevData => {
      const newData = [...prevData];
      newData[index].count += 1;
      return newData;
    });
  };

  const decrementCount = (index) => {
    setCartData(prevData => {
      const newData = [...prevData];
      if (newData[index].count > 1) {
        newData[index].count -= 1;
      } else {
        // If count becomes 0 or less, remove the item from cart
        newData.splice(index, 1);
      }
      return newData;
    });
  };

  const cartproducts = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.productImage} style={styles.img} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>₹ {item.price} /-</Text>
          <View style={styles.quantityContainer}>
           
            <TouchableOpacity style={styles.quantityButton} onPress={() => decrementCount(index)}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{item.count}</Text>

            <TouchableOpacity style={styles.quantityButton} onPress={() => incrementCount(index)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          </View>
          <Button title="Remove" onPress={() => removeFromCart(item)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation}>
          <Image source={arrow} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Item In Cart ({cartdata.length})</Text>
        <TouchableOpacity onPress={() => navigation.navigate('homeScreen')}>
          <Image source={home} style={styles.arrow} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartdata}
        renderItem={cartproducts}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fffff0"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  arrow: {
    width: 40,
    height: 40
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 130,
    height: 130,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    color: "green",
    fontSize: 18,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: "black"
  },
  quantityButtonText: {
    fontSize: 25,
    color: "white"
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
