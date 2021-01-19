import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors';
import Constants from '../constants/Constants';

const Order: React.FC<Props> = ({
  orderNumber,
  customerName,
  neighbourhood,
  address,
  packagesNum,
  latitude,
  longitude,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };



  return (
    <>
      <StatusBar
        backgroundColor={modalVisible ? Colors.white : Colors.topColor}
        barStyle="dark-content"
        translucent={true}
      />
      <TouchableNativeFeedback onPress={handlePress}>
        <View style={styles.container}>
          <View style={delivered && styles.overlay} />
          <View style={styles.topContainer}>
            <Text style={styles.topText}>N°: {orderNumber}</Text>
            <Text style={styles.topText}>{customerName}</Text>
          </View>
          <Text style={styles.addressText}>
            {address}, <Text style={styles.boldText}>{neighbourhood}</Text>
          </Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>{delivered && 'ENTREGADO'}</Text>
            <View style={styles.bottomRightContainer}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={20}
                color={Colors.white}
              />
              <Text style={styles.addressText}>{packagesNum}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export interface Props {
  orderNumber: number;
  customerName: string;
  neighbourhood: string;
  address: string;
  packagesNum: number;
  latitude: number;
  longitude: number;
}

export default Order;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  container: {
    width: '95%',
    height: 100,
    borderWidth: Constants.borderWidth,
    borderRadius: Constants.borderRadius / 5,
    borderColor: Colors.white,
    marginVertical: 5,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  topContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topText: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.white,
  },

  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  bottomRightContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },

  bottomText: {
    color: Colors.lightGreen,
    fontSize: 20,
    fontWeight: '700',
  },

  addressText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
  },

  boldText: {
    fontWeight: '700',
  },
});
