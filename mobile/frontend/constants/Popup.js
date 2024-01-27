import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const Popuptoast = ({ message, type }) => {
  showMessage({
    message: message,
    type: type,
    backgroundColor: '#000',
    color: 'blue',
    position: 'center', // Set the position to 'top'
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // Adjust the top value to position the message at the desired location
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
  },
});

export default Popuptoast;
