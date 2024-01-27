import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontContext } from '../../constants/fonts/FontContext';
import LoadingIndicator from '../../constants/fonts/LoadingIndicator';
import MainHeader from '../../constants/Header/MainHeader';

const NewAddressScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [house, setHouse] = useState('');
  const [street, setStreet] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [buttonScale] = useState(new Animated.Value(1));



  // // FONT FAMILY LOADING
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <MainHeader
        title="New Address"
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Add New Address</Text>

          <Text style={styles.label}>Delivery To</Text>
          <TextInput
            placeholder="e.g. John Doe"
            style={[styles.input, styles.textInput]}
            onChangeText={text => setName(text)}
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="e.g. (+91)1234567890"
            style={[styles.input, styles.textInput]}
            onChangeText={text => setMobile(text)}
          />

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            placeholder="e.g. 123654"
            style={[styles.input, styles.textInput]}
            onChangeText={text => setPincode(text)}
          />

          <Text style={styles.label}>House Number and Building</Text>
          <TextInput
            placeholder="e.g. Oberoi Heights"
            style={[styles.input, styles.textInput]}
            onChangeText={text => setHouse(text)}
          />

          <Text style={styles.label}>Street Name</Text>
          <TextInput
            placeholder="e.g. Back Street"
            style={[styles.input, styles.textInput]}
            onChangeText={text => setStreet(text)}
          />

          <Text style={styles.label}>Address Type</Text>

          <View style={styles.addressTypeContainer}>
            <TouchableOpacity
              onPress={() => setAddressType('Home')}
              style={[styles.addressTypeButton, addressType === 'Home' && styles.selectedAddressTypeButton]}
            >
              <Ionicons name="home-outline" size={24} color={addressType === 'Home' ? 'white' : 'black'} />
              <Text style={[styles.addressTypeButtonText, addressType === 'Home' && styles.selectedAddressTypeButtonText]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddressType('Office')}
              style={[styles.addressTypeButton, addressType === 'Office' && styles.selectedAddressTypeButton]}
            >
              <Ionicons name="briefcase-outline" size={24} color={addressType === 'Office' ? 'white' : 'black'} />
              <Text style={[styles.addressTypeButtonText, addressType === 'Office' && styles.selectedAddressTypeButtonText]}>Office</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddressType('Other')}
              style={[styles.addressTypeButton, addressType === 'Other' && styles.selectedAddressTypeButton]}
            >
              <Ionicons name="navigate-outline" size={24} color={addressType === 'Other' ? 'white' : 'black'} />
              <Text style={[styles.addressTypeButtonText, addressType === 'Other' && styles.selectedAddressTypeButtonText]}>Other</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    marginBottom: 5,
    color: '#544f4f',
    fontFamily: 'Poppins-Regular'
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular'

  },
  textInput: {
    height: 50,
    fontFamily: 'Poppins-Regular'

  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedAddressTypeButton: {
    backgroundColor: '#ff6347',
    borderColor: '#ff6347',
  },
  addressTypeButtonText: {
    marginLeft: 5,
  },
  selectedAddressTypeButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular'

  },
  addButton: {
    backgroundColor: "#E94440",
    marginVertical: 10,
    marginHorizontal: 3,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins-Medium",
  },
});

export default NewAddressScreen;
