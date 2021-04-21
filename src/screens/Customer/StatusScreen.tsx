import React, { useState, useEffect } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { handleStatusImages } from '../../utils';
import { API_URL } from '../../services';
import Colors from '../../constants/Colors';
import { StackParams } from '../../navigation/types';

interface Props {
  navigation: StackNavigationProp<StackParams>;
  route: RouteProp<StackParams, 'MainScreen'>;
}
interface History {
  fecha: string;
  estado: string;
}

const StatusScreen = ({ navigation, route }: Props) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [history, setHistory] = useState<History[]>([]);

  const orderStatus = history[history.length - 1]?.estado; // :/
  const providerID = orderNumber?.slice(0, 4);

  const handleSubmit = (): void => {
    navigation.navigate('HistoryScreen', { orderNumber, history });
  };

  useEffect(() => {
    if (!route.params) return;
    const { id_segui, estadoHist } = route.params.data;
    setOrderNumber(id_segui);
    setHistory(estadoHist);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Text style={styles.title}>Detalle de pedido</Text>
      <Text style={styles.orderNumber}>{orderNumber || 0}</Text>
      <View style={styles.orderInfo}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: `${API_URL}/logos/${providerID}.png`,
            }}
          />
        </View>
        <View style={styles.middleContainer}>
          <Image
            style={styles.image}
            source={handleStatusImages(orderStatus)}
          />
          <Text
            style={[
              styles.orderStatus,
              {
                color: Colors.lightGreen,
              },
            ]}>
            {orderStatus}
          </Text>
        </View>
      </View>
      <TouchableNativeFeedback onPress={handleSubmit}>
        <View style={styles.seeHistoryContainer}>
          <Text style={styles.seeHistoryText}>Ver Historial</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default StatusScreen;

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

  orderNumber: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: Colors.white,
    letterSpacing: 1,
  },

  orderInfo: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 30,
  },

  logoContainer: {
    width: '100%',
    alignSelf: 'center',
  },

  logo: {
    width: '100%',
    resizeMode: 'contain',
  },

  middleContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },

  orderStatus: {
    fontSize: 45,
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '700',
  },

  seeHistoryContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  seeHistoryText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
});
