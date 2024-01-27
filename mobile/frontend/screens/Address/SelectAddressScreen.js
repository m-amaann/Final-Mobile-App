// SelectAddressScreen.jsx
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainHeader from "../../constants/Header/MainHeader";

const { width, height } = Dimensions.get('window');

const SelectAddressScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([
        // Sample data
        {
            name: "John Doe",
            street: "123, My street",
            details: "Kinkston, kinkston-653263, Argentina",
            phone: "9876542313"
        }
    ]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

    return (
        <>
        <MainHeader 
        title="Select Address"
        navigation={navigation}
        />
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.addButton} 
                        onPress={() => navigation.navigate('NewAddressScreen', { setAddresses })}
                    >
                        <Text style={styles.addButtonText}>+ ADD NEW ADDRESS</Text>
                    </TouchableOpacity>
                </View>

                {addresses.map((address, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.addressBox} 
                        onPress={() => setSelectedAddressIndex(index)}
                    >
                        <Text 
                            style={[styles.radio, selectedAddressIndex === index && styles.selectedRadio]}
                        >
                            {selectedAddressIndex === index ? '●' : '○'}
                        </Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.addressName}>{address.name}</Text>
                            <Text style={styles.addressDetails}>{address.street}</Text>
                            <Text style={styles.addressDetails}>{address.details}</Text>
                            <Text style={styles.addressPhone}>{address.phone}</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('EditAddress', { index, address, setAddresses })}
                        >
                            <Text style={styles.editIcon}>✎</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.deliveryButton}>
                <Text style={styles.deliveryButtonText}>DELIVER HERE</Text>
            </TouchableOpacity>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollContainer: {
        padding: 15,
        paddingBottom: 70 // making space for the deliver button
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    addButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10
    },
    addButtonText: {
        color: 'white',
        fontFamily: "Poppins-Bold",

    },
    addressBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        fontFamily: "Poppins-Regular",

    },
    radio: {
        marginRight: 10,
        fontSize: 24
    },
    selectedRadio: {
        color: '#007AFF'
    },
    addressName: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: "Poppins-Bold",

    },
    addressDetails: {
        color: '#777',
        marginBottom: 2,
        fontFamily: "Poppins-Regular",

    },
    addressPhone: {
        color: '#777'
    },
    editIcon: {
        marginLeft: 10,
        fontSize: 20,
        color: '#007AFF'
    },
    deliveryButton: {
      position: 'absolute',
      bottom: 20, 
      left: 16,   
      right: 16,  
      backgroundColor: "#E94440",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
  },
  deliveryButtonText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 16,
      fontFamily: "Poppins-Medium",
  }
});

export default SelectAddressScreen;
