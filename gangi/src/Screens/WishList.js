import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WishList = ({navigation}) => {
  const [wishItems, setWishItems] = useState([]); // State to store wishlist items

  useEffect(() => {
    const unsubribe = navigation.addListener('focus', () => {
      wishItem();
    });
    return unsubribe;
  }, [navigation]);

  const wishItem = async () => {
    try {
      const values = await AsyncStorage.getItem('wishItems');
      const wishItems = values ? JSON.parse(values) : [];
      console.log("wishlistpage", wishItems);
      setWishItems(wishItems); // Set wishlist items in state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={wishItems} // Use wishItems from state
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={item.productImage} />
              <Text style={styles.text}>{item.category}</Text>
              <Text style={styles.text}>{item.model}</Text>
              <Text style={styles.text}>₹ {item.price}/-</Text>
              <Text style={styles.text}>{item.descriptions}</Text>
              <Button title='BUY NOW' onPress={() => console.log("Buy Now")} />
            </View>
          )}
          numColumns={2}
          keyExtractor={item => item.id.toString()} // Ensure item.id is converted to string
        />
      </SafeAreaView>
    </View>
  );
}

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
  },
});
