import styled from 'styled-components';


export const LoginTitle = styled.Text`
  color: rgba(229, 57, 53, 1);
  font-family: 'Poppins-Bold';
  font-size: 23px;
  padding-top: 10px;
  padding-left: 15px;
  top: 1%;
  text-align: left;
  margin-bottom: 10px;
`;


export const ContainerBottom = styled.View`
    flex: 1;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 8px;
    background-color: #fff;
    margin-top: 10px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    padding-horizontal: 26px;
    padding-top: 25px;
`;


export const TextLabel = styled.Text`
    color: #4a5568;
    margin-left: 4px;
    font-family: 'Poppins-Regular';
`;


export const TextInput1 = styled.TextInput`
    font-family: 'Poppins-Regular';
    font-size: 14px;
    padding: 12px;
    background-color: #ECECEC;
    color: #4a5568; 
    border-radius: 30px; 
    margin-bottom: 25px;
`;


export const TextInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  background-color: #ececec;
`;

export const TextInput2 = styled.TextInput`
  padding: 12px;
  font-size: 14px;
  padding-left: 8px;
  flex: 1;
  color: #4a5568;
  font-family: 'Poppins-Regular';
`;

export const PasswordToggleIcon = styled.TouchableOpacity`
  padding: 4px;
  padding-right: 10px;
`;


export const ForgotPassword = styled.TouchableOpacity`
    display: flex;
    align-items: flex-end;
`;



export const ForgotPasswordButtonText = styled.Text`
    color: #4a5568; 
    font-size: 13px;
    padding-top:10px;
    margin-bottom: 20px; 
    font-family: 'Poppins-Regular';
`;



export const LoginButton = styled.TouchableOpacity`
    width: 280px;
    margin-top: 30px;
    height: 42px;
    align-items: center;
    justify-content: center;
    background-color: rgba(233, 68, 64, 1);
    border-radius: 30px;
    margin-left: 43px;
    border: none;
    cursor: pointer;
`;


export const LoginButtonText = styled.Text`
    font-size: 17px;
    color: #fff;
    font-family: 'Poppins-Bold';
`;

export const Additional = styled.TouchableOpacity`
    display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px; 
`;


export const AdditionalBtnText = styled.Text`
    color: #718096;
    font-size: 12px;
    font-family: 'Poppins-Regular';
    font-weight: 600;
`;

export const SignUpContainer = styled.TouchableOpacity`
    cursor: pointer;
`;


export const SignUpText = styled.Text`
    font-size: 12px;
    font-family: 'Poppins-Medium';
    color: #F2433F;
    
`;