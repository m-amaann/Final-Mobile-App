import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const WriteReviewScreen = ({ route }) => {
    const navigation = useNavigation();
    const { product, productImage, productId, orderId, userId } = route.params;

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const filledStar = require('../../../assets/icon/fillstar.png');
    const emptyStar = require('../../../assets/icon/star.png');


    const submitReview = async () => {
        try {
            const response = await fetch('http://192.168.8.159:5000/api/reviews/createReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    orderId,
                    rating,
                    review,
                }),
            });

            if (!response.ok) {
                const errorRes = await response.json();
                throw new Error(errorRes.message || 'Failed to submit review');
            }

            Alert.alert('Success', 'Review submitted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Write a Review</Text>
            </View>

            {product && (
                <View style={styles.productContainer}>
                    <Text style={styles.productName}>{product}</Text>
                    <Image source={{ uri: productImage }} style={styles.productImage} />
                </View>
            )}
            <Text style={styles.reviewDate}>Today's Date</Text>

            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity key={index} onPress={() => setRating(index)}>
                        <Image
                            source={index <= rating ? filledStar : emptyStar}
                            style={styles.star}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.reviewInput}
                onChangeText={setReview}
                value={review}
                placeholder="Leave some feedback"
                maxLength={255}
                multiline
                numberOfLines={5}
                minHeight={Platform.OS === 'ios' ? 20 * 5 : null}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <ScrollView contentContainerStyle={styles.flexGrow} />
                <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
                    <Text style={styles.submitButtonText}>Leave Review</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
    },
    backButton: {
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f3f3f3'
    },
    productName: {
        fontSize: 17,
        color: '#333',
        flexShrink: 1,
        fontFamily: 'Poppins-Bold',
        marginRight: 10
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 7,
        alignItems: 'flex-end',
        alignSelf: 'flex-end',

    },
    reviewDate: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 15,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    star: {
        width: 31,
        height: 31,
        marginHorizontal: 12,
    },
    reviewInput: {
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top', // For Android
        fontSize: 16,
        color: '#333',
        height: 150, // Fixed height for the text input
    },
    flex: {
        flex: 1,
    },
    flexGrow: {
        flexGrow: 1,
    },
    submitButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: Platform.OS === 'ios' ? 20 : 0, // Add some bottom padding on iOS
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default WriteReviewScreen;
