import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Constants from '../../constants/Constants';

const OrderStatusScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
          <View style={styles.seeHistoryButton}>
            <TouchableHighlight onPress={toggleModal}>
              <Text style={styles.seeHistoryText}>Ver Historial</Text>
            </TouchableHighlight>
          </View>
        </View>
      </LinearGradient>
      <Modal animationType="fade" visible={modalVisible}>
        <ScrollView>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              style={styles.modalTouchableIcon}
              onPress={toggleModal}>
              <MaterialCommunityIcons
                style={styles.modalIcon}
                name="arrow-left-thick"
                size={33}
                color="black"
              />
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </Modal>
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
    width: '100%',
  },

  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
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

  seeHistoryButton: {
    borderColor: Colors.white,
    borderWidth: Constants.borderWidth,
    borderRadius: Constants.borderRadius,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '50%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 50,
  },

  seeHistoryText: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
  },

  modalTouchableIcon: {
    padding: 16,
  },

  modalIcon: {
    left: 5,
    top: 5,
  },
});
