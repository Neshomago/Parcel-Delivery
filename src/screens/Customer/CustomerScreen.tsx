import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const CustomerScreen = ({ navigation }: any) => {
  const [orderId, setOrderId] = useState('');

  const handleInput = (text: string) => {
    setOrderId(text.replace(/[^0-9]/g, ''));
  };

  const handlePress = () => {
    navigation.navigate('OrderStatusScreen');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.customerTopColor, Colors.customerBottomColor]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={Colors.customerTopColor}
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/navira.png')}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => handleInput(text)}
              value={orderId}
              placeholder="Introduzca su numero de envio"
              placeholderTextColor={Colors.white}
              keyboardType="numeric"
              maxLength={15}
            />
            <MaterialCommunityIcons
              style={styles.icon}
              name="qrcode-scan"
              size={25}
              onPress={() => {
                navigation.navigate('QRCodeCustomer');
              }}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={handlePress}>
              <View>
                <Text style={styles.touchableText}>Consultar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={() => {
                navigation.navigate('QRCodeCustomer');
              }}>
              <View>
                <Text style={styles.touchableText}>Codigo QR</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  logoContainer: {
    width: '90%',
    marginTop: 100,
    marginBottom: 50,
  },

  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },

  cardContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },

  inputContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginVertical: 20,
  },

  textInput: {
    flex: 1,
    paddingLeft: 20,
    fontSize: 20,
    borderWidth: Constants.borderWidth / 1.5,
    borderColor: Colors.white,
    color: Colors.white,
  },

  buttons: {
    width: '100%',
  },

  touchableContainer: {
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: Constants.borderWidth,
    borderRadius: Constants.borderRadius,
    borderColor: Colors.white,
  },

  touchableText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },

  icon: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
    color: Colors.white,
  },

  modalContainer: {
    flex: 1,
  },

  error: {
    color: 'red',
  },
});

export default CustomerScreen;
