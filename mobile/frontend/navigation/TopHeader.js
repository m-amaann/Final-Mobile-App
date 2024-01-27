import React, { useContext } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontContext } from '../constants/fonts/FontContext';
import LoadingIndicator from '../constants/fonts/LoadingIndicator';


const TopHeader = ({navigation}) => {

     // FONT FAMILY LOADING LOGIC
     const fontsLoaded = useContext(FontContext);
     if (!fontsLoaded) {
       return <LoadingIndicator />;
     }
  



  return (
    <SafeAreaView>
      <View style={styles.AppbarWrapper}>
        <View style={styles.appBar}>
          <Icon name={'location-outline'} size={22} color="#000" />
          <View>
            <Text style={styles.addresstitle}>Delivery now
              <Icon name={'chevron-down-outline'} size={15} color="#827F7F"  />
            </Text>
            <Text style={styles.location}>Zaras garden, wellampitiya</Text>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.profile}>
              <Image
                source={require('../../assets/profile/profile.png')} 
                style={styles.profileImage}
              />
            </View>
          </View>
          
        </View>
      </View>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  )
}

export default TopHeader



const styles = StyleSheet.create({
    AppbarWrapper: {
       marginHorizontal: 22,
       
       paddingTop: 10
      },
    appBar: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center"
      },
      location: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        
        color: "#ADACAC",
      },
      addresstitle: {
        textAlign: "center",
        color: '#E94440',
        fontFamily: 'Poppins-Regular',
        flexDirection: 'row',
        fontSize: 12,
      },
      profileImage: {
        width: 35,
        height: 35,
        borderRadius: 8,
      }
  });