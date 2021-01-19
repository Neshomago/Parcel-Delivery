import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';
import Constants from '../../constants/Constants';

const OrderStatusScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={[Colors.customerTopColor, Colors.customerBottomColor]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <View style={styles.orderInfo}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/navira.png')}
            />
          </View>
          <Text style={styles.orderNumber}>N°: 123.456</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/delivering.png')}
            />
          </View>
          <Text style={styles.orderStatus}>RECIBIDO</Text>
          <View style={styles.seeHistoryContainer}>
            <Text
              style={styles.seeHistoryText}
              onPress={() => navigation.navigate('OrderHistory')}>
              Ver Historial
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default OrderStatusScreen;

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
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: Colors.white,
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
    color: Colors.lightGreen,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 20,
  },

  seeHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  seeHistoryText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
