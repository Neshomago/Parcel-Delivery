import React, { useEffect, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { API_URL } from '../../services';
import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { getUserOrder } from '../../services';
import { StackParams } from '../../navigation/types';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

interface IProps {
  navigation: StackNavigationProp<StackParams>;
}

const MainScreen = ({ navigation }: IProps) => {
  const [orderId, setOrderId] = useState('004703000X000500003160');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [providerID, setProviderID] = useState('');

  const maxInputLength = 22;

  const handleInput = (text: string) => {
    setOrderId(text.replace(/[^0-9a-zA-Z]/g, ''));
  };

  const handleSubmit = async () => {
    if (!orderId || orderId.length < maxInputLength) return;
    setIsLoading(true);
    try {
      const { data } = await getUserOrder(orderId);
      data && navigation.navigate('StatusScreen', { data });
    } catch {
      setErrorMessage('Pedido inexistente');
    }

    setIsLoading(false);
  };

  const handleQRPress = (): void => {
    navigation.navigate('QRScanner');
  };
  useEffect(() => {
    if (orderId.length > 3) setProviderID(orderId.slice(0, 4));
    else setProviderID('');
  }, [orderId]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FocusAwareStatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={
              providerID
                ? { uri: `${API_URL}/logos/${providerID}.png` }
                : require('../../../assets/navira.png')
            }
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => handleInput(text)}
              value={orderId}
              placeholder="Introduzca su numero de envio"
              placeholderTextColor={Colors.white}
              maxLength={maxInputLength}
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
              style={styles.touchableIcon}
              onPress={handleQRPress}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="qrcode-scan"
                  size={40}
                />
              </View>
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
  },

  logoContainer: {
    width: '90%',
    marginTop: 60,
    marginBottom: 20,
  },

  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },

  infoContainer: {
    flex: 1,
    alignItems: 'center',
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

  touchableIcon: {
    borderWidth: Constants.borderWidth * 2,
    borderColor: Colors.white,
    borderRadius: 100,
    alignSelf: 'center',
    padding: 20,
    marginTop: 20,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: Colors.white,
  },

  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});

export default MainScreen;
