import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import LogoutIcon from '../../../assets/icon/logout.png';
import UserImg from '../../../assets/profile/profile.png';


const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        setUsername(userData); // Assuming 'name' is the property containing the user's name
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };



  const handleLogout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
        navigation.navigate('Login')
    }
    catch (e) {
      console.error(e); //error
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>

        <Image style={styles.profileImage}  source={{ uri: username.image }}/>

        <Text style={styles.username}>{username.name}</Text>
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
          <MaterialIcons name="edit" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Information</Text>

      {/* My Account Menu */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('')}>
        <MaterialIcons name="account-circle" size={24} color="#cecece" />
        <Text style={styles.menuText}>My Account</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Order & Return Menu */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
        <MaterialIcons name="history" size={24} color="#cecece" />
        <Text style={styles.menuText}>All Orders</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Wishlist Menu */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('WishlistScreen')}>
        <MaterialIcons name="favorite" size={24} color="#cecece" />
        <Text style={styles.menuText}>Wishlist</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Coupons Menu */}
      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="local-offer" size={24} color="#cecece" />
        <Text style={styles.menuText}>Coupons</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle2}>Settings</Text>

      {/* App Settings Menu */}
      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="settings" size={24} color="#cecece" />
        <Text style={styles.menuText}>App Settings</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Hotline Menu */}
      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="phone" size={24} color="#cecece" />
        <Text style={styles.menuText}>Hotline</Text>
        <Text style={{marginRight: 5, fontFamily: 'Poppins-Regular', color: '#cecece'}}>+94 776369428</Text>
      </TouchableOpacity>

      {/* Saved Cards & Wallets Menu */}
      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="credit-card" size={24} color="#cecece" />
        <Text style={styles.menuText}>Saved Cards & Wallets</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Saved Address Menu */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectAddressScreen')}>
        <MaterialIcons name="home" size={24} color="#cecece" />
        <Text style={styles.menuText}>Saved Address</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Browse FAQs Menu */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FAQs')}>
        <MaterialIcons name="help" size={24} color="#cecece" />
        <Text style={styles.menuText}>Browse FAQs</Text>
        <MaterialIcons name="navigate-next" size={24} color="#555" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : ( <View style={styles.LogoutWrapper}>
          <Image style={{height: 26, width: 26, right: 100,}} source={LogoutIcon}/>
                <Text style={styles.logoutText}>Logout</Text>
        </View>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  profileImage: {
    width: 68,
    height:67,
    borderRadius: 30,
    marginRight: 20,
  },
  username: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Medium'
  },
  editIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ececec',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'Poppins-Bold'
  },
  sectionTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginLeft: 15,
  },
  menuText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  LogoutWrapper: {
    flexDirection: 'row',
  },
  logoutText: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
});

export default ProfileScreen;
