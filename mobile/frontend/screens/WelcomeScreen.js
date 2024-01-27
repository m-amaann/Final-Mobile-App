import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { FontContext } from '../constants/fonts/FontContext';
import LoadingIndicator from './../constants/fonts/LoadingIndicator';

import {
  OptionLoginBtnText,
  Shop_introtitle,
  SplashScreenLogo,
  WeclomeIcon,
  WelcomeBottomWrapper,
  WelcomeBtn,
  WelcomeBtnText,
  WelcomeOptionLoginBtn,
  WelcomeOptional,
  WelcomeOptionalText,
  WelcomeView
} from '../component/style';


const WelcomeScreen = ({ navigation }) => {

  const { width, height } = Dimensions.get('window');

  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }


  return (
    <WelcomeView style={styles.container}>
      <SplashScreenLogo resizeMode="cover" source={require('./../../assets/logo/logo.png')} />

      <Shop_introtitle>STOCK MART LANKA</Shop_introtitle>

      <WelcomeBottomWrapper>  
        <WelcomeBtn onPress={() => navigation.navigate('Startchoice')}>
          <WelcomeBtnText>Get Started </WelcomeBtnText>
          <WeclomeIcon source={require('../../assets/icon/arrow.png')} />
        </WelcomeBtn>  

        <WelcomeOptional>
            <WelcomeOptionalText>Already have an account? </WelcomeOptionalText>
              <WelcomeOptionLoginBtn>
                <OptionLoginBtnText onPress={() => navigation.navigate('BottomTab')}> 
                  Log In
                </OptionLoginBtnText>
              </WelcomeOptionLoginBtn>
        </WelcomeOptional>
      </WelcomeBottomWrapper>

      <StatusBar barStyle="light-content" />
    </WelcomeView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#c33c41',
  }
});



export default WelcomeScreen;