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
    backgroundColor: '#f7f7f7',
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  model: {
    fontSize: 16,
    color: '#555',
  },
});

export default SearchBar;
