// BottomTabNavigator.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import ProcessOrder from '../screen/ProcessOrder';
import CompletedOrders from '../screen/CompletedOrders';

const Tab = createBottomTabNavigator();

// Dummy component for the Logout screen
const DummyComponent = () => null;

export const BottomTabNavigator = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const HandleLogout = async () => {
    // console.log("Starting logout process..."); 
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      // console.log("Token removed successfully"); 
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ProcessOrder') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'CompletedOrders') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Logout') {
            iconName = focused ? 'ios-log-out' : 'ios-log-out-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarButton: (props) => {
          if (props.accessibilityLabel === 'Logout') {
            return (
              <TouchableOpacity {...props} onPress={() => {/* Your logout action here */}}>
                <Icon name="ios-log-out" size={props.size} color={props.color} />
              </TouchableOpacity>
            );
          }
          return <TouchableOpacity {...props} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="ProcessOrder" component={ProcessOrder} options={{ headerShown: false }}/>
      <Tab.Screen name="CompletedOrders" component={CompletedOrders} options={{ headerShown: false }}/>
      <Tab.Screen 
        name="Logout" 
        component={DummyComponent} // Use the dummy component here
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default action (navigation)
            HandleLogout(); // Call your logout function
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
