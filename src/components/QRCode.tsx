import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const QRCode = ({ navigation }: any) => {
  const [isTorchOn, setTorchOn] = useState(false);
  const onSuccess = (e) => {
    Alert.alert(e.data);
  };

  const handleTorch = () => {
    setTorchOn(!isTorchOn);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      cameraStyle={{ height: SCREEN_HEIGHT }}
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={{ fontSize: 30, color: 'white' }}>ESCANNER QR</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle} />

            <View style={styles.leftAndRightOverlay} />
          </View>

          <View style={styles.bottomOverlay} />
        </View>
      }
      flashMode={
        isTorchOn
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      topContent={
        <TouchableWithoutFeedback
          style={styles.buttonTouchable}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="arrow-left-thick"
            size={33}
            color={Colors.white}
          />
        </TouchableWithoutFeedback>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <MaterialCommunityIcons // Show/Hide Password Icon
            style={styles.icon}
            name={isTorchOn ? 'flashlight' : 'flashlight-off'}
            size={20}
            onPress={handleTorch}
          />
        </TouchableOpacity>
      }
    />
  );
};

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const styles = StyleSheet.create({
  buttonTouchable: {},
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 99,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
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

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default QRCode;
