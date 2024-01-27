import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const getStatusDetails = (currentStatus, status, statuses) => {
  let currentIndex = statuses.indexOf(currentStatus);
  let statusIndex = statuses.indexOf(status);
  let color;
  if (statusIndex < currentIndex) {
    color = "#4CAF50"; // completed status
  } else if (statusIndex === currentIndex) {
    color = "#F44336"; // current status
  } else {
    color = "#cecece"; // status not reached
  }

  const icons = {
    Pending: "hourglass-empty",
    Processing: "build",
    Packaging: "local-shipping",
    Delivered: "done",
  };

  const descriptions = {
    Pending: "Your order has been placed",
    Processing: "Your order is being prepared",
    Packaging: "Our delivery executive is on the way",
    Delivered: "Your order was delivered successfully",
  };

  return {
    color: color,
    icon: icons[status] || "error",
    description: descriptions[status] || "",
  };
};

const StatusDetails = ({
  currentStatus,
  orderId,
  orderTime,
  statusChangeTime,
}) => {
  const statuses = ["Pending", "Processing", "Packaging", "Delivered"];


//   Get Display Date with Days funtion 
const getCurrentFormattedDate = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
  
    return `${day}, ${dayOfMonth} ${month}`;
  };

  const currentDate = getCurrentFormattedDate();



  return (
    <View style={styles.container}>
      {/* order details */}
      <View style={styles.orderInfoContainer}>
        <Text style={styles.orderID}>Order ID: {orderId}</Text>
        <Text style={styles.orderTime}>Order Time: {orderTime}</Text>
        <Text style={styles.currentDay}>{currentDate}</Text>
      </View>

      {statuses.map((status, index) => {
        const { color, icon, description } = getStatusDetails(
          currentStatus,
          status,
          statuses
        );
        const isCurrentStatus = currentStatus === status;

        return (
          <View key={index} style={styles.statusContainer}>
            {index !== 0 && (
              <View
                style={[
                  styles.verticalLine,
                  {
                    backgroundColor:
                      statuses.indexOf(status) <=
                      statuses.indexOf(currentStatus)
                        ? "green"
                        : "#e0e0e0",
                  },
                ]}
              />
            )}
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
              <Icon name={icon} size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.statusText, { color: color }]}>
                {status}
              </Text>
              <Text style={styles.descriptionText}>{description}</Text>
              {isCurrentStatus && (
                <Text style={styles.timeText}>{statusChangeTime}</Text>
              )}
            </View>

          
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fffcfc",
    borderRadius: 10,
  },
  orderInfoContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
},
orderID: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: '#F44336' 
},
orderTime: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',

},
currentDay: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',

},

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    position: "relative",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  descriptionText: {
    color: "#666",
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    fontFamily: 'Poppins-Regular',

  },
  verticalLine: {
    position: "absolute",
    top: -43,
    left: 24,
    height: "100%",
    width: 2,
    zIndex: 0,
  }
});

export default StatusDetails;
