import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';

import Order from '../../components/CustomerOrder';
import Colors from '../../constants/Colors';

import { StackParams } from '../../navigation/types';

interface Props {
  route: RouteProp<StackParams, 'HistoryScreen'>;
}

const HistoryScreen = ({ route }: Props) => {
  const { history } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Text style={styles.title}>Historial de pedido</Text>
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
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
  },

  title: {
    fontSize: 38,
    color: Colors.white,
  },

  orderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  orderNumber: {
    fontSize: 23,
    letterSpacing: 1,
    color: Colors.white,
  },

  ordersHistory: {},
});
