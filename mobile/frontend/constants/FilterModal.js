// FilterModal.js
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

const FilterComponent = ({ isVisible, onClose, onFilter }) => {
  const [priceRange, setPriceRange] = React.useState(0);
  
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Filter Products</Text>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Price Range:</Text>
          <Slider
            value={priceRange}
            onValueChange={value => setPriceRange(value)}
            maximumValue={30000}  // set your maximum price range
            step={1}
            style={styles.slider}
          />
          <Text>LKR. {priceRange.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onFilter(priceRange);
            onClose(); 
          }}
        >
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  slider: {
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#f15656',
    borderRadius: 7,
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});

export default FilterComponent;
