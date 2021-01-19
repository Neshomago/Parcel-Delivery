import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Order from '../../components/Order';
import Colors from '../../constants/Colors';
import { getOrders } from '../../api/mock';

const Orders = ({ navigation }: any) => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const handleUserLoadingError = (res: any) => {
      if (res.error === 401) {
        navigation.navigate('Login');
      } else {
        console.log('ELSE?????');
      }
    };

    getOrders()
      .then((res: any) => setOrders(res.orders))
      .catch(handleUserLoadingError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={[Colors.topColor, Colors.bottomColor]}
          style={styles.linearGradient}
          start={{ x: 0.7, y: 0.3 }}>
          {orders.map((data: any) => (
            <Order
              key={data.orderNumber}
              orderNumber={data.orderNumber}
              customerName={data.customerName}
              neighbourhood={data.neighbourhood}
              address={data.address}
              packagesNum={data.packagesNum}
              latitude={data.latitude}
              longitude={data.longitude}
            />
          ))}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
  },
});
