import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainHeader from '../../constants/Header/MainHeader'
import { StatusBar } from 'expo-status-bar';


const FAQContent = [
    {
        question: 'What is Cash on Delivery (COD) and how does it work?',
        answer: 'Cash on Delivery is a convenient payment method where you pay for your order in cash once it arrives at your doorstep. Simply choose the COD option when placing your order.'
    },
    {
        question: 'Can I cancel my Cash on Delivery order?',
        answer: 'Yes, you can cancel COD orders, but cancellations must be made within 10 minutes of order placement to ensure that we can process it before the order is dispatched.'
    },
    {
        question: 'What should I do if I miss the 10-minute window for COD order cancellation?',
        answer: 'If you miss the cancellation window, please contact our customer service team immediately. We will do our best to assist you, but we cannot guarantee cancellation after the 10-minute window.'
    },
    {
        question: 'Are card payment orders eligible for cancellation?',
        answer: 'Orders paid by card cannot be cancelled once processed, as these transactions are immediately finalized to secure your purchase and ensure fast delivery.'
    },
    {
        question: 'What is your return and refund policy?',
        answer: 'At Stock Mart Lanka, all sales are final. We do not accept returns or offer refunds, so please review your order carefully before making a purchase.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order is placed, you will receive an email with a tracking number. You can use this number on our website to track the status and estimated delivery time of your order.'
    },
    {
        question: 'What if I receive a damaged item?',
        answer: 'While we do not offer returns or refunds, if your item arrives damaged, please contact us within 24 hours of receipt with photo evidence, and we will address your concern on a case-by-case basis.'
    },
    {
        question: 'How do I know my payment is secure?',
        answer: 'We use industry-standard encryption and secure payment gateways to ensure that all transactions are protected. Your financial security is our top priority.'
    },
    {
        question: 'Can I place an order for an out-of-stock item?',
        answer: 'Unfortunately, we do not accept orders for items that are out of stock. You can use the "Notify Me" feature to receive an alert when the item becomes available.'
    },
    {
        question: 'Do you offer any loyalty programs or discounts?',
        answer: 'Yes, we value our customers and offer loyalty points for purchases which can be redeemed for discounts on future orders. Make sure to sign up for our newsletter for exclusive deals and offers.'
    },
];

const FAQItem = ({ faq }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.faqItem} onPress={() => setExpanded(!expanded)}>
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons
                    name={expanded ? 'ios-remove' : 'ios-add'}
                    size={16}
                    color="#08415C"
                    style={{ marginRight: 3, marginLeft: 7 }}
                />
            </TouchableOpacity>
            {expanded && <Text style={styles.answerText}>{faq.answer}</Text>}
        </View>
    );
};

export default function FAQs({ navigation }) {
    return (
        <>
            <MainHeader
                title=""
                navigation={navigation}
            />

            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.headerText}>FAQ</Text>
                    {FAQContent.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </View>
            </ScrollView>
      <StatusBar barStyle="light-content" />

        </>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    innerContainer: {
      padding: 15,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#D84445',
      textAlign: 'center',
    },
    faqItem: {
      marginBottom: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E8E8E8',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    questionText: {
      fontSize: 14.5,
      color: '#08415C',
      flex: 1,
      lineHeight: 20,
    },
    answerText: {
      fontSize: 13,
      color: '#2E2E2E',
      marginLeft: 5,
      paddingBottom: 20,

    }
  });