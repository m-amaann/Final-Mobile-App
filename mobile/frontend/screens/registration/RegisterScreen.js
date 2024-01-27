import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { Alert, Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";


const { width, height } = Dimensions.get('window');

export default function RegisterScreen({navigation}) {
    // FONT FAMILY LOADING LOGIC
    const fontsLoaded = useContext(FontContext);
    if (!fontsLoaded) {
      return <LoadingIndicator />;
    }


    
//initialize
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async () => {

      // Check if email contains '@'
  if (!email.includes('@')) {
    Alert.alert("Error", "Email contain charactor @ format");
    return;
  }

  // Check password length and special characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_]/;
  if (password.length < 6 || !specialCharRegex.test(password)) {
    Alert.alert("Error", "Password must be at least 6 characters and include special characters like '@' and '_'");
    return;
  }


    const user = {
      name,
      email,
      address,
      phone: mobileNo,
      password,
    };

    try {
      // Fetch request to your API
      let response = await fetch('http://192.168.8.159:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      let data = await response.json();
      if (data.message) {
        await AsyncStorage.setItem('user', JSON.stringify({ name, email, address, phone: mobileNo }));
        Alert.alert('Registration Successful', 'You have been registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Registration Failed', 'An error occurred during registration');
    }
  };

  return (
    <Container>
      <LogoIMGMain className="items-center">
        <LogoImage
          source={require('../../../assets/logo/mainlogo.png')}
        />
      </LogoIMGMain>

      <Title className="{ fontFamily: 'Roboto' }">Create an Account</Title>

      <InputMain>
        <InputContainer>
          <TextInputStyled 
            placeholder="Enter Your Full Name"
            value={name}
            name="person"
            onChangeText={(text) => setName(text)}
          />
        </InputContainer>

        <InputContainer>
          <TextInputStyled
            placeholder="Enter Your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </InputContainer>

        <InputContainer>
          <TextInputStyled
            placeholder="Enter Your Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </InputContainer>

        <InputContainer>
          <TextInputStyled
            placeholder="Mobile Number"
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
          />
        </InputContainer>

        <InputContainer>
          <TextInputStyled
            placeholder="Create a New Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </InputContainer>

        <ButtonContainer>
          <Button 
            onPressIn={handleRegister}
            // onPress={() => navigation.navigate('RegisterwithPhone')}
          >
            <ButtonText>Register</ButtonText>
          </Button>
        </ButtonContainer>

        <Text style={{ textAlign: 'center',marginBottom: 4, color: '#898888' }}>
          - or continue with -
        </Text>

        <ButtonContainer>
          <GoogleButtonContainer>
            <GoogleButtonImage
              source={require('../../../assets/icon/google.png')}
            />
            <GoogleButtonText>Continue with Google</GoogleButtonText>
          </GoogleButtonContainer>
        </ButtonContainer>

        <AdditionalText>
          Already have an account?{" "}
          <Text 
            style={{ fontWeight: '600', color: '#E53935' }} 
            onPress={() => navigation.navigate('Login')}>
              Sign In
          </Text>
        </AdditionalText>
      </InputMain>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 30px 22px 35px 28px;
  background-color: rgba(255, 245, 242, 1);
`;

const LogoIMGMain = styled.View`
  display: flex;
`;

const LogoImage = styled.Image`
  width: 100px;
  height: 99px;
  top: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: rgba(229, 57, 53, 1);
  font-size: 23px;
  font-family: 'Poppins-Bold';
  top: 30px;
  margin-bottom: 30px;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const InputMain = styled.View`
  padding-top: 30px;
`;

const TextInputStyled = styled.TextInput`
  height: 46px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  font-family: 'Poppins-Regular';
  font-size: 13px;
  border-width: 1px ;
  border-color: rgba(255, 245, 242, 1);

`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Button = styled.TouchableOpacity`
  width: 260px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: rgba(233, 68, 64, 1);
  border-radius: 30px;
  margin-bottom: 16px;
`;

const ButtonText = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
  font-family: 'Poppins-Bold';
`;

const GoogleButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 30px 7px 19px;
  background-color: rgba(255, 255, 255, 0);
  width: 260px;
  height: 40px;
  border-radius: 30px;
  border: 1px solid #A6A6A6;
`;

const GoogleButtonImage = styled.Image`
  width: 20px;
  height: 100%;
`;

const GoogleButtonText = styled.Text`
  flex: 1;
  color: #5A5A5A;
  font-size: 14px;
  font-family: 'Poppins-Bold';
  text-align: center;
`;

const AdditionalText = styled.Text`
  color: #242424;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  text-align: center;
`;


const iconStyle = {
  marginRight: 10,
};