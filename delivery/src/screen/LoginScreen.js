import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Separator from '../component/Separator'
import ToggleButton from '../component/ToggleButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constant/Colors';
import LoadingIndicator from '../constant/fonts/LoadingIndicator';
import { FontContext } from '../constant/fonts/FontContext';
import { Display } from '../utils';
import LottieView from 'lottie-react-native';

//image
import Cover from '../../assets/Cover/6982750_3333449.jpg';

import GeneralAction from '../actions/GeneralAction';
import AuthenicationService from '../services/AuthenicationService';
import StorageService from '../services/StorageService';




const LoginScreen = ({ navigation }) => {

  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }


  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };


  const checkIfLoggedIn = async () => {
    const driverToken = await AsyncStorage.getItem("token");
    if (driverToken) {
      navigation.navigate("BottomTabNavigator", { screen: "ProcessOrder" });

    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);


  //SignIn Function
  const SignIn = async () => {
    setEmailError(null);
    setPasswordError(null);

      // Check if both email and password fields are empty
  if (email.trim() === "" && password.trim() === "") {
    Alert.alert("Error", "Both inputs are empty, please fill them");
    return;
  }

   if (email.trim() === "") {
    Alert.alert("Error", "Email input is empty, please fill it");
    return;
  }

  if (password.trim() === "") {
    Alert.alert("Error", "Password input is empty, please fill it");
    return;
  }


     // Validate email and password
  if (!validateEmail(email)) {
    Alert.alert("Error", "Please enter a valid email address.");

    return;
  }

  if (!validatePassword(password)) {
    Alert.alert("Error", "Please enter a valid password.");
    return;
  }


    try {
      const driver = {
        email,
        password,
      };

      const response = await fetch("http://192.168.8.159:5000/api/driver/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      });

      const data = await response.json();

      if (response.status === 200) {
         // Save token
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        await AsyncStorage.setItem("driver", JSON.stringify(data.driver._id));

        Alert.alert("Driver Login Successfully", "You have been logged in successfully");
        navigation.navigate("BottomTabNavigator", { screen: "ProcessOrder" });
        setEmail('');
        setPassword('');
      } else {
        Alert.alert("Login Failed", data.message || "Please Check Your Entered Inputs");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Login Failed", "An error occurred during login");
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
      
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <Image source={Cover} style={{ width: 350, height: 200}}/>
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>This is Delivery Application for Stock Mart Lanka.</Text>


      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={19}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.forgotPasswordContainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </View>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={SignIn}
        // onPress={() => navigation.navigate('ProcessOrder')}
        activeOpacity={0.8}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signinButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 35,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: -15
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREY,
    fontFamily: 'Poppins-Medium',
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: 'rgba(233, 68, 64, 0.6);',
    fontFamily: 'Poppins-Bold',
  },
  signinButton: {
    backgroundColor: 'rgba(233, 68, 64, 1);',
    borderRadius: 12,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: 'Poppins-Medium',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
});

export default LoginScreen;