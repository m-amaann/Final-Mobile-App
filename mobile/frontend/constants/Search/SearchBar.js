import React, { useState } from 'react';
import { View } from 'react-native';
import { OptionsButton, OptionsIcon, SearchButton, SearchIcon, SearchInput } from '../../component/homescreen_style';

const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (query) => {
    // Implement your search logic here and update setSearchResults
  }

  return (
    <View style={{ flexDirection: 'column', paddingHorizontal: 18 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <SearchButton>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={(query) => {
              setSearchQuery(query);
              updateSearchResults(query);
            }}
          />
        </SearchButton>
        <OptionsButton>
          <OptionsIcon />
        </OptionsButton>
      </View>
      
    </View>
  )
}

export default SearchBar;
