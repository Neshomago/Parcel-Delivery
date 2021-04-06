import React, { useState, useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { handleStatusImages } from '../../utils';
import { API_URL } from '../../services';

import Colors from '../../constants/Colors';

interface history {
  fecha: string;
  estado: string;
}

const StatusScreen = ({ navigation, route }: any) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [history, setHistory] = useState<history[]>([]);

  const orderStatus = history[history.length - 1]?.estado;
  const providerID = orderNumber?.slice(0, 4);

  const handleSubmit = () => {
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
      <LinearGradient
        colors={[Colors.purple3, Colors.purple]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <View style={styles.orderInfo}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: `${API_URL}/logos/${providerID}.png`,
              }}
            />
          </View>
          <Text style={styles.orderNumber}>{orderNumber || 0}</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={handleStatusImages(orderStatus)}
            />
          </View>
          <Text
            style={[
              styles.orderStatus,
              {
                color: Colors.lightGreen,
              },
            ]}>
            {orderStatus}
          </Text>
          <View style={styles.seeHistoryContainer}>
            <Text style={styles.seeHistoryText} onPress={handleSubmit}>
              Ver Historial
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  linearGradient: {
    flex: 1,
    width: '100%',
  },

  logoContainer: {
    width: '90%',
    alignSelf: 'center',
  },

  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },

  orderInfo: {
    flex: 1,
  },

  orderNumber: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: Colors.white,
    letterSpacing: 1,
  },

  imageContainer: {
    width: '50%',
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
    flex: 1,
    marginTop: 20,
  },
  seeHistoryText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
