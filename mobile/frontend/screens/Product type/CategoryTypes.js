import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontContext } from '../../constants/fonts/FontContext';
import LoadingIndicator from '../../constants/fonts/LoadingIndicator';

const CategoryTypes = ({categories}) => {
// FONT FAMILY LOADINGs
const fontsLoaded = useContext(FontContext);
if (!fontsLoaded) {
  return <LoadingIndicator />;
}

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <View style={styles.categoryContainer} key={category._id}>
            <Image
              source={{ uri: category.image }}
              style={styles.image}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#f9f9f9',
  },
  categoryName: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});

export default CategoryTypes;