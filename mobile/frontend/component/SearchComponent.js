import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  FlatList,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchComponent = ({ onSearch, placeholder }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSearchHistory();
  }, []);


  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      setSearchHistory(history ? JSON.parse(history) : []);
    } catch (error) {
      console.error('Failed to load search history', error);
    }
  };

  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
    onSearch(searchText);
    if (searchText.length > 0) {
      updateSearchHistory(searchText);
    }
  };

  const handleHistoryItemPress = (historyItem) => {
    setSearchQuery(historyItem);
    onSearch(historyItem);
    Keyboard.dismiss(); // Dismiss the keyboard when a history item is selected
  };

  const updateSearchHistory = async (searchText) => {
    const updatedHistory = [searchText, ...searchHistory.filter(text => text !== searchText)].slice(0, 10); // Keep last 10 searches
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to save search history', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
       style={styles.searchBar}
       placeholder={placeholder || "Search..."}
       value={searchQuery}
       onChangeText={handleSearch}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SearchComponent;
