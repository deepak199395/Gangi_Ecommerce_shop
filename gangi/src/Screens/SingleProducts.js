import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image ,button, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings'; // Importing AirbnbRating component

const SingleProducts = ({ navigation, route }) => {
  const { product } = route.params; // Get the passed product from route.params

  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      wishItem();
    });
    return unsubscribe;
  }, [navigation]);

  const wishItem = async () => {
    try {
      const values = await AsyncStorage.getItem('products');
      const wishItems = values ? JSON.parse(values) : [];
      console.log("singleproducts", wishItems);
      setWishItems(wishItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={product.productImage} style={styles.image} />
      <AirbnbRating
      count={5}
      reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
      defaultRating={3}
      size={20}
      showRating={false}
      style={styles.rating}
    />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.model}>{product.model}</Text>
      <Text style={styles.price}>₹ {product.price}/-</Text>
      <Text style={styles.description}>{product.descriptions}</Text>
     <Button title='ADD TO CART'/>
    </View>
  );
};

export default SingleProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBlockColor:"#ccf2ff"
  },
  image: {
    width: 250,
    height: 350,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth:1,
    borderColor:"black",
    backgroundColor:"white"
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  model: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  rating: {
    marginTop: 10,
  },
});
