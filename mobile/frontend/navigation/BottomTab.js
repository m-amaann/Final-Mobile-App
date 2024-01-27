import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

// Other imports
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import CustomTabBarIcon from '../constants/ICONS/Icons';
import { FontContext } from '../constants/fonts/FontContext';
import LoadingIndicator from '../constants/fonts/LoadingIndicator';
import { selectTotalItems } from '../redux/selectors';
import AddCart from '../screens/Cart/AddCart';
import OrderItemsList from '../screens/Order/OrderItemsList';
import HomeScreen from '../screens/home/HomeScreen';
import ProductScreen from '../screens/products/ProductScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {



  const totalItems = useSelector((state) => selectTotalItems(state));



  // FONT FAMILY LOADING
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../../assets/icon/home.png')
              : require('../../assets/icon/home.png');
          } else if (route.name === 'Product') {
            iconSource = focused
              ? require('../../assets/icon/list-search.png')
              : require('../../assets/icon/list-search.png');
          } else if (route.name === 'Cart') {
            iconSource = focused
              ? require('../../assets/icon/shopping-bag.png')
              : require('../../assets/icon/shopping-bag.png');  
          } 
          else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../../assets/icon/user.png')
              : require('../../assets/icon/user.png');
          }
          return <CustomTabBarIcon focused={focused} iconSource={iconSource} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#E94440',
        tabBarInactiveTintColor: '#656161',
        tabBarStyle: styles.tabBarStyle,
        headerLeft: () => {
          const navigation = useNavigation(); 
          return (
            <TouchableOpacity
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Icon name="chevron-back-outline" size={22} color="#777777" />
            </TouchableOpacity>
          );
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold', 
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Product" component={ProductScreen} options={{ headerTitle: 'Product', }} />
      <Tab.Screen name="Cart" component={AddCart} options={{ tabBarBadge: totalItems, headerShown: false }} />
          {() => <AddCart updateCartCount={updateCartCount} />}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};



const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#ffffff',
    padding: 4,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  cartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 26,
    height: 26,
  },
  focusedCart: {
    tintColor: '#E94440',
  },
  cartIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
  },
  backButton: {
    display: 'flex',
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
  },
});

export default BottomTab;
