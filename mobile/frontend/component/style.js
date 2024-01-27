import styled from 'styled-components';




// ---------------------------- WELCOME SCREEN STYLE ABOVE -------------------------------------
export const WelcomeView = styled.View`
  flex: 1;
  background: transparent;
  align-items: center;
  justify-content: center;
`;

export const SplashScreenLogo = styled.Image`
  width: 110px;
  height: 110px;
  align-self: center;
  position: absolute;
  top: 80px;
`;

export const Shop_introtitle = styled.Text`
  color: #ffffff;
  font-family: 'Poppins-Bold';
  font-size: 29px;
  text-align: center;
  margin-top: 220px;
  position: absolute;
  top: 0;
`;

export const WelcomeBottomWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  padding-bottom: 40px;
`;


export const WelcomeBtn = styled.TouchableOpacity`
  width: 300px;
  height: 46px;
  border-radius: 30px;
  background-color: #fff;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

export const WelcomeBtnText = styled.Text`
  color: #E94440;
  font-family: 'Poppins-Bold';
  position: absolute;
  font-size: 17px;
  text-align: center;
`;


export const WeclomeIcon = styled.Image`
  margin-left: 83%;
  height: 35px;
  width: 35px;
  tint-color: #E94440;
`;

export const WelcomeOptional = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const WelcomeOptionalText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Regular';
`;

export const WelcomeOptionLoginBtn = styled.TouchableOpacity`

`;

export const OptionLoginBtnText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Bold';
`;




// ---------------------------- START CHOICE SCREEN STYLE BELOW -------------------------------------

export const StartView = styled.View`
  flex: 1;
  justify-content: center;
  background-color: transparent;
`;

export const Choicecover = styled.Image`
  max-width: 90%;
  max-height: 35%;
  flex: 1;
  justify-content: flex-end;
  top: 10%;
`;

export const StartchoiceTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 24px;
  color: #fff8f6;
  text-align: center;
  top: 19%;
  padding-horizontal: 4%;
  letter-spacing: 1.1px;
  line-height: 40px;
`;

export const Choiceparagraphtext = styled.Text`
  font-size: 12px;
  color: #413d3d;
  padding-top: 40px;
  letter-spacing: 0.7px;
  line-height: 19px;
  margin-top: 120px;
  padding-horizontal: 13px;
  text-align: center;
`;

export const StartButtonContainer = styled.View`
  top:14%;
  flex-direction: column;
`;

export const ChoiceBtnlogin = styled.TouchableOpacity`
  background-color: #e94440;
  color: #ffffff;
  width: 250px;
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 25px;
`;

export const ChoiceBtnregister = styled.TouchableOpacity`
  background-color: #fff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 25px;
`;

export const ChoicebuttonTextLogin = styled.Text`
  color: #ffffff;
  font-family: 'Poppins-Bold';
  text-align: center;
  font-size: 15px;

`;

export const ChoicebuttonTextregister = styled.Text`
  color: #e94440;
  text-align: center;
  font-size: 15px;
  font-family: 'Poppins-Bold';
`;



// ---------------------------- LOGIN SCREEN STYLE BELOW -------------------------------------
