// import React, { useEffect } from 'react';
// import { StatusBar, StyleSheet, View } from 'react-native';
// import * as Animatable from 'react-native-animatable';

// const LoadingScreen = ({ navigation }) => {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('WelcomeScreen');
//     }, 3000); 
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animatable.Image
//         animation="pulse"
//         easing="ease-out"
//         iterationCount="infinite"
//         source={require('../../../assets/logo/mainlogo.png')}
//         style={{
//           width: 100,
//           height: 100,
//         }}
//       />
//       <StatusBar barStyle="auto"/>

      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   }
// });

// export default LoadingScreen;