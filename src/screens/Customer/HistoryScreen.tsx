import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Order from '../../components/Customer/Order';
import Colors from '../../constants/Colors';

const OrderHistory = ({ route }: any) => {
  const { orderNumber, history } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={[Colors.purple3, Colors.purple]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <View style={styles.orderContainer}>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
        </View>
        <View style={styles.ordersHistory}>
          {history.map((order: any, index: number) => (
            <Order
              key={index}
              date={order?.fecha}
              status={order?.estado}
              isFirst={index === 0}
              isDisabled={false}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  linearGradient: {
    flex: 1,
    width: '100%',
  },

  orderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  orderNumber: {
    fontSize: 23,
    letterSpacing: 1,
    color: Colors.white,
  },

  ordersHistory: {},

  // imageTextContainer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  // },

  // image: {
  //   height: 150,
  //   width: '50%',
  //   resizeMode: 'contain',
  // },

  // status: {},
});
