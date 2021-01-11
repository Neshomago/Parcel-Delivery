import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Order from '../../components/Order';
import Colors from '../../constants/Colors';
import { data } from '../../components/data';

const Orders = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={[Colors.topColor, Colors.bottomColor]}
          style={styles.linearGradient}
          start={{ x: 0.7, y: 0.3 }}>
          {data.map((d) => (
            <Order
              key={d.orderNumber}
              orderNumber={d.orderNumber}
              customerName={d.customerName}
              neighbourhood={d.neighbourhood}
              address={d.address}
              packagesNum={d.packagesNum}
              latitude={d.latitude}
              longitude={d.longitude}
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
