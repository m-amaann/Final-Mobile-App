import React from "react";
import { StyleSheet, View } from "react-native";
import CustomHead from "../../constants/Header/CustomHead";
import StatusDetails from "./StatusDetails";

const OrderTracking = ({ navigation, route }) => {
  const { order } = route.params;
  return (
    <>
      <View>
        <CustomHead title="Order Tracking" navigation={navigation} />
      </View>
      <View style={{ backgroundColor: "#fffcfc", flex: 1 }}>
        <StatusDetails
          currentStatus={order.status}
          orderId={order._id}
          orderTime={order.orderDate}
          statusChangeTime="11:00 AM"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default OrderTracking;
