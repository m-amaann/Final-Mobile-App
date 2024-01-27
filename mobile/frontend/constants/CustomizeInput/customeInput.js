import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { loadFonts } from '../customfonts';


const customeInput = ({value, setValue, placeholder, secureTextEntry}) => {

    useEffect(() => {
        // Load custom fonts when the component mounts
        loadFonts();
      }, []);

  return (
    <View style={CustomInputfile.container}>
      <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        
        style={CustomInputfile.input}
      />
    </View>
  )
}

export default customeInput



const CustomInputfile = StyleSheet.create({
    container: {
        backgroundColor: '#FFF3F1',
        width: '83%',
        height: '5%',
        top: -60,
        borderColor: '#FFE7E0',
        borderWidth: 0.9,
        borderRadius: 8,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',

        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 7
    },
    input: {

    }

})