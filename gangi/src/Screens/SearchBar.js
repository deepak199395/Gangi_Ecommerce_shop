import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { items } from '../Database/Database';
import filter from 'lodash.filter';

const SearchBar = () => {
  const [data, setData] = useState(items);
  const [searchValue, setSearchValue] = useState('');

  const searchHandle = (text) => {
    setSearchValue(text);
    const formattedQuery = text.trim().toLowerCase();

    if (formattedQuery === '') {
      setData(items);
    } else {
      const filteredData = filter(items, (product) => {
        return contents(product, formattedQuery);
      });
      setData(filteredData);
    }
  };

  const contents = ({ category }, text) => {
    return category.toLowerCase().includes(text.toLowerCase());
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Products"
        value={searchValue}
        onChangeText={(text) => searchHandle(text)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={item.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
              <Text style={styles.model}>{item.model}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  model: {
    fontSize: 16,
  },
});

export default SearchBar;
