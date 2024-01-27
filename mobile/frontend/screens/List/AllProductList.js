import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import CustomHead from '../../constants/Header/CustomHead';

const AllProductList = ({navigation}) => {
    return (
        <>
        <CustomHead title="All Products" navigation={navigation} />
        <View style={styles.container}>
            
            <StatusBar barStyle='default'/>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})

export default AllProductList;
