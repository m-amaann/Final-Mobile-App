import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { Alert, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Additional,
  AdditionalBtnText,
  ContainerBottom,
  ForgotPassword,
  ForgotPasswordButtonText,
  LoginButton,
  LoginButtonText,
  LoginTitle,
  PasswordToggleIcon,
  SignUpContainer,
  SignUpText,
  TextInput1,
  TextInput2,
  TextInputContainer,
  TextLabel,
} from "../../component/LoginStyle";

import { useEffect } from "react";
import { colors } from "../../constants/Themes/themes";
import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";

export default function LoginScreen({ navigation }) {
  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  // initialize of state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // *************** Main Handle Functions Below **********************

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      navigation.navigate("BottomTab", { screen: "Home" });
    }
  };

  const handleLogin = async () => {
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
      const user = {
        email,
        password,
      };

      const response = await fetch("http://192.168.8.159:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.status === 200) {
         // Save token
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("Token stored in AsyncStorage:", data.token);

        Alert.alert("Login Successful", "You have been logged in successfully");
        navigation.navigate("BottomTab", { screen: "Home" });
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

  // Password visible toggle
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: colors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/cover/login-2.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <LoginTitle>Sign In</LoginTitle>
      </SafeAreaView>

      <ContainerBottom>
        <View>
          <TextLabel>Email Address</TextLabel>
          <TextInput1
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextLabel>Password</TextLabel>
          <TextInputContainer>
            <TextInput2
              secureTextEntry={!showPassword}
              placeholder="Enter Your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <PasswordToggleIcon onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#827F7F"
              />
            </PasswordToggleIcon>
          </TextInputContainer>

          <ForgotPassword onPress={() => navigation.navigate("Forgetpassword")}>
            <ForgotPasswordButtonText>
              Forgot Password?
            </ForgotPasswordButtonText>
          </ForgotPassword>

          <LoginButton onPress={handleLogin}>
            <LoginButtonText>Login</LoginButtonText>
          </LoginButton>
        </View>

        <Additional>
          <AdditionalBtnText>Don't have an account?</AdditionalBtnText>

          <SignUpContainer onPress={() => navigation.navigate("Register")}>
            <SignUpText> Sign Up</SignUpText>
          </SignUpContainer>
        </Additional>
      </ContainerBottom>
    </View>
  );
}
