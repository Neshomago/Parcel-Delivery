import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera, BarCodeReadEvent } from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import { getUserOrder } from '../services';
import { StackParams } from '../navigation/types';

const { height, width } = Dimensions.get('window');

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

interface IProps {
  navigation: StackNavigationProp<StackParams>;
  isProvider: boolean;
}

const QRScanner = ({ navigation, isProvider = false }: IProps) => {
  const [isTorchOn, setTorchOn] = useState(false);

  const handleDataSend = (data: object) => {
    if (isProvider) return '';
    else data && navigation.navigate('StatusScreen', { data });
  };
  const onSuccess = (e: BarCodeReadEvent): void => {
    getUserOrder(e.data)
      .then((res) => handleDataSend(res.data))
      .catch((err) => Alert.alert(err));
  };

  const handleTorch = (): void => {
    setTorchOn(!isTorchOn);
  };

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000}
        cameraStyle={{ height }}
        cameraProps={{
          flashMode: isTorchOn
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off,
        }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={styles.mainText}>
                Ubic?? el codigo QR dentro del recuadro
              </Text>
            </View>

            <View style={styles.midOverlayContainer}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle} />

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
        topContent={
          <>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                style={styles.leftIcon}
                name="arrow-left-thick"
                size={33}
                color={Colors.white}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <MaterialCommunityIcons
                style={styles.rightIcon}
                name={isTorchOn ? 'flashlight' : 'flashlight-off'}
                size={28}
                color={Colors.white}
                onPress={handleTorch}
              />
            </TouchableWithoutFeedback>
          </>
        }
      />
    </>
  );
};

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: width,
    width: width,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
  },
  midOverlayContainer: {
    flexDirection: 'row',
  },

  leftAndRightOverlay: {
    height: width * 0.65,
    width: width,
    backgroundColor: overlayColor,
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  bottomOverlay: {
    flex: 1,
    height: width,
    width: width,
    backgroundColor: overlayColor,
    paddingBottom: width * 0.25,
  },

  leftIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 99,
  },

  rightIcon: {
    position: 'absolute',
    top: 30,
    right: 15,
    zIndex: 99,
  },
});

export default QRScanner;
