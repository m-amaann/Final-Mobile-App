import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { addToWishlist } from '../../../redux/actions/Actions';
import { useDispatch, useSelector } from "react-redux";



const ProductItem2 = ({ products }) => {
    const maxProductsToShow = 70;
    const displayedProducts = products.slice(0, maxProductsToShow);
    const halfWay = Math.ceil(displayedProducts.length / 2);
    const leftProducts = displayedProducts.slice(0, halfWay);
    const rightProducts = displayedProducts.slice(halfWay);

    const navigation = useNavigation();


    const dispatch = useDispatch();

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    };


    const renderProduct = (product) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate("ProductDetails", { product: product })}
        >
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productTitle} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productPrice}>Rs.{product.discountprice}</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon} onPress={() => handleAddToWishlist(product, products)}>
                <Icon name="favorite-border"
                    style={styles.heartIconText} size={20} color="#F6534F"
                />
            </TouchableOpacity>
            {product.newArrival && (
                <View style={styles.newArrivalLabel}>
                    <Text style={styles.newArrivalText}>New</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                {leftProducts.map((product, index) => (
                    <React.Fragment key={'left-' + index}>
                        {renderProduct(product)}
                    </React.Fragment>
                ))}
            </View>
            <View style={styles.column}>
                {rightProducts.map((product, index) => (
                    <React.Fragment key={'right-' + index}>
                        {renderProduct(product)}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default ProductItem2;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    column: {
        width: '50%',
        paddingHorizontal: 8,
    },
    productCard: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
    },
    productImage: {
        width: '100%',
        height: 140,
        borderRadius: 3,
        marginBottom: 8,
    },
    productDetails: {
        padding: 5,
    },
    productTitle: {
        fontSize: 14,
        color: '#333333',
        fontFamily: 'Poppins-Bold',
        marginBottom: 6,
        lineHeight: 22,
        // Set a fixed width for ellipsis effect
        width: '100%',

    },
    productPrice: {
        fontSize: 16,
        color: '#FF5722',
        fontWeight: '600',
        fontFamily: 'Poppins-Bold',
        marginBottom: 4,
    },
    newArrivalLabel: {
        position: 'absolute',
        left: 14,
        top: 16,
        backgroundColor: 'rgba(255, 102, 102, 0.6)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 31,
        height: 31,


    },
    newArrivalText: {
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textAlign: 'center',
    },
    heartIcon: {
        position: 'absolute',
        right: 11,
        top: 11,
        padding: 5,
        backgroundColor: '#fff2f2',
        borderRadius: 50

    },
    heartIconText: {
        fontSize: 20,
        color: '#e91e63',
    },
    // Add any other styles you might have...
});