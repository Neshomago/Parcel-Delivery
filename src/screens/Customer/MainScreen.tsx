import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { getUserOrder } from '../../services';
import { CustomerStackParams } from '../../navigation';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

// 004703000X000500003160
// 004803000X000500003152
// 004803000X00025XZ0ZBEW
// 004703000X00025XZ0Z94H
// 004703000X00025XZ0Z3J9

interface Props {
  navigation: StackNavigationProp<CustomerStackParams>;
}

const MainScreen = ({ navigation }: Props) => {
  const [orderId, setOrderId] = useState('004803000X00025XZ0ZBEW');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDataSend = (data: object) => {
    data && navigation.navigate('StatusScreen', { data });
  };

  const handleInput = (text: string) => {
    setOrderId(text.replace(/[^0-9a-zA-Z]/g, ''));
  };

  const handleSubmit = () => {
    // if (!orderId || orderId.length < 22) return;
    setIsLoading(true);
    getUserOrder(orderId)
      .then((res) => {
        handleDataSend(res.data);
      })
      .catch(() => setErrorMessage('Pedido inexistente'));

    setIsLoading(false);
  };

  const handleQRPress = () => {
    navigation.navigate('QRScanner');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.purple3, Colors.purple]}
          style={styles.linearGradient}
          start={{ x: 0.7, y: 0.3 }}>
          <FocusAwareStatusBar
            barStyle="light-content"
            backgroundColor={Colors.purple3}
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
                maxLength={22}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.touchableContainer}
                onPress={handleSubmit}>
                <View>
                  <Text style={styles.touchableText}>Consultar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableContainer}
                onPress={handleQRPress}>
                <View>
                  <Text style={styles.touchableText}>Escanear codigo QR</Text>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="qrcode-scan"
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            {isLoading && (
              <ActivityIndicator size="large" color={Colors.white} />
            )}
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
    resizeMode: 'contain',
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
    color: Colors.white,
  },

  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});

export default MainScreen;
