import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontContext } from '../../constants/fonts/FontContext';
import LoadingIndicator from '../../constants/fonts/LoadingIndicator';

const { width } = Dimensions.get('window');

const ProductScreen = ({ navigation }) => {
  // FONT FAMILY LOADINGs
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

// Fetching the Categories Function 
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.8.159:5000/api/category/getAllCategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.message) {
        Alert.alert('Error', 'An error occurred while fetching categories');
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // Searching categories name function 
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
    {filteredCategories.length > 0 ? (
      <View style={styles.categoryContainer}>
        {filteredCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryCard,
              index % 2 === 0 ? styles.leftCard : styles.rightCard,
            ]}
            onPress={() => {
              // Handle onPress
            }}
          >
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <Text style={styles.notFoundText}>No items found</Text>
    )}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchBarContainer: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',

  },
  searchInput: {
    height: 40,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: width / 2 - 32,
    marginVertical: 12,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  leftCard: {
    marginLeft: 8,
  },
  rightCard: {
    marginRight: 8,
  },
  categoryImage: {
    width: '100%',
    height: width / 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  categoryText: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14.5,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#333',
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});
export default ProductScreen;
