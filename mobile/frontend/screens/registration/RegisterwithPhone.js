import React, { useContext, useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  Alert 
} from 'react-native';
import MainHeader from '../../constants/Header/MainHeader'; // Ensure you have this component
import { FontContext } from '../../constants/fonts/FontContext';
import LoadingIndicator from '../../constants/fonts/LoadingIndicator';

const RegisterWithPhone = ({ navigation }) => {
  
    // FONT FAMILY LOADING LOGIC
    const fontsLoaded = useContext(FontContext);
    if (!fontsLoaded) {
      return <LoadingIndicator />;
    }


    // const [mobileNo, setMobileNo] = useState('');

    // const handleGetOTP = async () => {
    //   if (mobileNo.length !== 10) {
    //     Alert.alert("Error", "Please enter a valid 10-digit mobile number");
    //     return;
    //   }
    
    //   try {
    //     const response = await fetch('http://192.168.8.159:5000/api/user/send-otp', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ phone: mobileNo }),
    //     });
  
    //     if (response.status === 201) {
    //       const data = await response.json();
    //       Alert.alert('Success', 'OTP sent successfully');
    //       navigation.navigate('RegisterOTPVerification', { mobileNo });
    //     } else {
    //       const data = await response.json();
    //       Alert.alert('Error', data.message || 'Failed to send OTP');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     Alert.alert('Error', 'An error occurred while sending OTP');
    //   }
    // };

    


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flexContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <MainHeader title="OTP Verification" navigation={navigation} />

        <View style={styles.contentContainer}>
          <Image
            source={require('../../../assets/cover/verification_Vector.png')} 
            style={styles.coverImage}
          />

          <Text style={styles.otpText}>OTP Verification</Text>
          <Text style={styles.instructionText}>
            We will send you an One Time Password on this mobile number
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="numeric"
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text.replace(/[^0-9]/g, ''))}
            maxLength={10}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetOTP}
          >
            <Text style={styles.buttonText}>GET OTP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterWithPhone;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 160, 
    resizeMode: 'contain',
    marginBottom: 40,
  },
  otpText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#555',
    marginHorizontal: 40,
    marginBottom: 40,
    paddingVertical: 10,
    textAlign: 'center',
    width: '80%',
  },
  button: {
   top: 50,
    backgroundColor: 'rgba(233, 68, 64, 1)',
    paddingVertical: 13,
    width: '80%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});
