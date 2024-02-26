import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, TouchableOpacity } from 'react-native';

import React, { useContext } from 'react';
import {
  ChoiceBtnlogin,
  ChoiceBtnregister,
  ChoicebuttonTextLogin,
  ChoicebuttonTextregister,
  Choicecover,
  Choiceparagraphtext,
  StartButtonContainer,
  StartView,
  StartchoiceTitle
} from '../component/style';
import { FontContext } from '../constants/fonts/FontContext';
import LoadingIndicator from '../constants/fonts/LoadingIndicator';

const StartChoiceScreen = ({ navigation }) => {


  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }


  return (
    <StartView>
      <LinearGradient
        colors={['rgba(255, 71, 66, 0.60)', '#E9E9E9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.4 }}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Choicecover source={require('./../../assets/cover/1.png')} />
        <StartchoiceTitle>Welcome to Our Shop</StartchoiceTitle>
        <Choiceparagraphtext>Get your baking goods & other essential items and create delicious cakes with our cake tool!</Choiceparagraphtext>
        <StartButtonContainer>
          <TouchableOpacity>
            <ChoiceBtnlogin onPress={() => navigation.navigate('Login')}>
              <ChoicebuttonTextLogin>Sign In</ChoicebuttonTextLogin>
            </ChoiceBtnlogin>
          </TouchableOpacity>

          <TouchableOpacity>
            <ChoiceBtnregister onPress={() => navigation.navigate('Register')}>
              <ChoicebuttonTextregister>Register</ChoicebuttonTextregister>
            </ChoiceBtnregister>
          </TouchableOpacity>
        </StartButtonContainer>
      </LinearGradient>
    </StartView>
  );
};

export default StartChoiceScreen; 