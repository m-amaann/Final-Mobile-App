import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert, Modal } from 'react-native';
import React, { useEffect, useState } from 'react'
import MainHeader from '../../constants/Header/MainHeader'
import { selectTotalItems, selectTotalAmount } from '../../redux/selectors';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentScreen } from './PaymentScreen';
import { Dimensions } from 'react-native';

// ************************************
const CheckoutScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState('');
    const [discount, setDiscount] = useState(0);


    useEffect(() => {
        getUserInfo();
        calculateDiscount();
    }, []);

    const getUserInfo = async () => {
        try {
            const userString = await AsyncStorage.getItem('user');
            if (userString) {
                const userData = JSON.parse(userString);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error retrieving user info:', error);
        }
    };

    // ADD TO CART
    const cartProducts = useSelector((state) => state.cart.cart);
    const cartItems = useSelector((state) => state.cart.cart);
    const totalAmount = useSelector(selectTotalAmount);

    // DELIVERY CHARGE
    const DELIVERY_CHARGE_PER_ITEM = 300;
    const totalDeliveryCharge = DELIVERY_CHARGE_PER_ITEM * selectTotalItems({ cart: { cart: cartItems } });


    // Discount
    const DISCOUNT_THRESHOLD = 7000;
    const DISCOUNT_PERCENTAGE = 6;

    const calculateDiscount = () => {
        if (totalAmount > DISCOUNT_THRESHOLD) {
            const discountAmount = (totalAmount * DISCOUNT_PERCENTAGE) / 100;
            setDiscount(discountAmount);
        } else {
            setDiscount(0);
        }
    };

    const finalAmount = totalAmount + totalDeliveryCharge - discount;


    // payment method function *************
    const [paymentMethod, setPaymentMethod] = React.useState('cash');
    const stripe = useStripe();

    const order = {
        customerId: user._id,
        totalAmount: finalAmount,
        orderItems: cartProducts.map(product => ({
            productName: product.name,
            productImage: product.imageUrl,
            quantity: product.quantity,
            price: product.discountprice,
        })),
        paymentType: paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'Not Paid' : 'Paid',
        paymentDate: paymentMethod === 'cash' ? null : new Date(),
    };

    const placeOrder = async () => {
        try {
            const response = await axios.post('http://192.168.8.159:5000/api/order/orders', order);
            Alert.alert("Order placed successfully");
            // console.log(response.data._id)
            navigation.navigate("ConfirmOrder", { order: response.data, username: user.name });

        } catch (error) {
            console.error('Error placing the order:', error);
            Alert.alert('Error placing the order:', error);
        }
    };

    const handlePlaceOrderPress = () => {
        if (paymentMethod === 'card') 
        {
            setModalVisible(true);
        } else {
            placeOrder();
        }
    };

    return (
        <>
            <MainHeader
                title="Checkout"
                navigation={navigation}
            />

            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView >
                    <View style={styles.card}>
                        <View style={styles.DeliverUser}>
                            <Text style={styles.Username}>Deliver to:</Text>
                            <Text style={styles.Username}> {user.name}</Text>
                        </View>
                        <View style={styles.userInformation}>
                            <Text style={styles.address}>{user.address}</Text>
                            <Text style={styles.phone}>{user.phone}</Text>
                            <View style={styles.separator} />
                            <Text style={styles.email}>{user.email}</Text>
                        </View>
                    </View>

                    {cartProducts.map((product, index) => (
                        <View style={styles.productcard} key={`checkout-product-${index}`}>
                            <View style={styles.productRow}>
                                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productTitle}>{product.name}</Text>
                                    <Text style={styles.productPrice}>Rs. {product.discountprice}</Text>
                                    <Text style={styles.productQuantity}>Qty. {product.quantity}</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.inlineRow}>
                                <Text style={styles.label}>Standard Delivery</Text>
                                <Text style={styles.value}>Rs.{DELIVERY_CHARGE_PER_ITEM}</Text>
                            </View>
                            <View style={styles.separator} />

                            <View style={styles.productRight}>
                                <Text style={styles.label}>Subtotal:</Text>
                                <Text style={styles.productamount}>Rs. {product.discountprice}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.inlineRow}>
                            <Text style={styles.label}>Items Total</Text>
                            <Text style={styles.value}>Rs.{totalAmount}</Text>
                        </View>
                        <View style={styles.inlineRow}>
                            <Text style={styles.label}>Delivery Fee</Text>
                            <Text style={styles.value}>Rs.{totalDeliveryCharge}</Text>
                        </View>
                        {totalAmount > DISCOUNT_THRESHOLD && (
                                <>
                                    <View style={styles.inlineRow}>
                                        <Text style={styles.label}>Discount</Text>
                                        <Text style={styles.value}>- Rs.{discount}</Text>
                                    </View>
                                    
                                </>
                            )}
                        <View style={styles.inlineRow}>
                            <Text style={styles.label}>Total Payment</Text>
                            <Text style={styles.value}>Rs.{finalAmount}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <RadioButton.Group onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod}>
                            <View style={styles.paymentmethodRow}>
                                <Image source={require('../../../assets/icon/credit-card.png')} style={styles.icon} />
                                <RadioButton.Item
                                    label="Credit/Debit Card"
                                    value="card"
                                    color="#E94440"
                                    uncheckedColor="#7F7D7D"
                                    status={paymentMethod === 'card' ? 'checked' : 'unchecked'}
                                    style={styles.radioButton}
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                            <View style={styles.paymentmethodRow}>
                                <Image source={require('../../../assets/icon/payment-method.png')} style={styles.icon} />
                                <RadioButton.Item
                                    label="Cash on Delivery"
                                    value="cash"
                                    color="#E94440"
                                    uncheckedColor="#7F7D7D"
                                    status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
                                    style={styles.radioButton}
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                        </RadioButton.Group>
                    </View>
                </ScrollView>

                <View style={styles.FooterRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>Rs.{finalAmount}</Text>
                </View>
                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={handlePlaceOrderPress}
                >
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
                </TouchableOpacity>

                {/* Payment Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <PaymentScreen
                                closeModal={() => setModalVisible(false)}
                                order={order}
                                user={user}
                                navigation={navigation}
                            />
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>

        </>
    )
}
const { width, height } = Dimensions.get('window');

export default CheckoutScreen;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        margin: 16,
    },
    productcard: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 16,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    inlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        padding: 2,
        color: '#7F7D7D',
        fontFamily: 'Poppins-Regular',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    DeliverUser: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
    },
    Username: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500'
    },
    userInformation: {
        fontFamily: 'Poppins-Regular',
    },
    address: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#949494',
    },
    phone: {
        fontFamily: 'Poppins-Regular',
        color: '#949494',
        fontSize: 14,
    },
    email: {
        fontFamily: 'Poppins-Medium',
        color: '#949494',
        fontSize: 14,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 64,
        height: 64,
        marginRight: 12,
        borderRadius: 6,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
    },
    productQuantity: {
        fontSize: 14,
        color: '#333',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
    },
    productRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 8,
    },
    productamount: {
        fontWeight: '600',
        fontSize: 14,
        color: '#E51E1E',
    },
    inlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    paymentmethodRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 21,
        height: 21,
        marginRight: 2,
    },
    radioButton: {
    },
    radioLabel: {
        fontSize: 14,
        padding: 2,
        color: '#7F7D7D',
        fontFamily: 'Poppins-Regular',
    },

    FooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Poppins-Medium',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,

    },
    totalLabel: {
        fontSize: 16,
        color: '#333',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#E94440',
    },
    placeOrderButton: {
        backgroundColor: '#E94440',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    placeOrderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Poppins-Medium",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});