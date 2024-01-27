import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import MainHeader from '../../constants/Header/MainHeader';

const RegisterOTPVerification = ({ route, navigation }) => {
    const [code, setCode] = useState(new Array(4).fill(''));
    const { phoneNumber } = route.params; 
  
    const onCodeDigitInput = (digit, index) => {
      const newCode = [...code];
      newCode[index] = digit.replace(/[^0-9]/g, '');
      setCode(newCode);
    };
  
    // const handleVerify = async () => {
    //   const otp = code.join('');
    //   if (otp.length !== 4) {
    //     Alert.alert("Error", "Please enter the 4-digit OTP");
    //     return;
    //   }
  
    //   try {
    //     const response = await fetch('http://192.168.8.159:5000/api/user/verify-otp', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ phone: phoneNumber, otp }),
    //     });
  
    //     const data = await response.json();
    //     if (data.success) {
    //       Alert.alert('Success', 'OTP Verified Successfully');
    //       // Navigate or perform additional actions
    //     } else {
    //       Alert.alert('Error', data.message || 'Failed to verify OTP');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     Alert.alert('Error', 'An error occurred during OTP verification');
    //   }
    // };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flexContainer}
        >
            <SafeAreaView style={styles.safeArea}>
                <MainHeader title="" navigation={navigation} />
                <View style={styles.container}>
                    <Text style={styles.title}>Verification</Text>
                    <Text style={styles.subtitle}>Enter The OTP Code From The Phone We Just Sent You at +994 09 999 00 00.</Text>
                    <Text style={styles.question}>Did You Enter The Correct Number?</Text>

                    <View style={styles.digitsContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.digitInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(digit) => onCodeDigitInput(digit, index)}
                            value={digit}
                            textAlign={'center'}
                        />
                    ))}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.receiveSMS}>Didn't receive SMS? </Text>
                        <TouchableOpacity onPress={onResendCode}  style={styles.resendButton}>
                            <Text style={styles.resendButtonText}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default RegisterOTPVerification;

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        marginBottom: 18,
        fontFamily: 'Poppins-Bold',
        color: '#E53935',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'left',
        paddingHorizontal: 0,
        marginBottom: 30,
        color: '#838383',
        fontFamily: 'Poppins-Regular',
    },
    question: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'Lexend-Medium',
        color: '#484848',

    },
    receiveSMS: {
        color: '#323232',
        fontSize: 14,
    },
    resendButton: {

    },
    resendButtonText: {
        color: '#E53935',
        fontSize: 15,
        fontWeight: '600',
        textDecorationLine: 'none',
    },
    digitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    digitInput: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        fontSize: 22,
        width: 60,
        height: 60,
        marginHorizontal: 10,
        elevation: 2,
    },
    verifyButton: {
        backgroundColor: '#E53935',
        borderRadius: 9,
        paddingVertical: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20, 
    },
    verifyButtonText: {
        fontSize: 19,
        color: '#FFF',
        fontFamily: 'Poppins-Medium',
        fontWeight: '600',
    },
});
