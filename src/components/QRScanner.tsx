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
import { RNCamera as Camera } from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { getUserOrder } from '../services';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const QRScanner = ({ navigation, isProvider = false }: any) => {
  const [isTorchOn, setTorchOn] = useState(false);

  const handleDataSend = (data: any) => {
    if (isProvider) return '';
    else data && navigation.navigate('StatusScreen', { data });
  };
  const onSuccess = (e: any) => {
    getUserOrder(e.data)
      .then((res) => handleDataSend(res.data))
      .catch((err) => Alert.alert(err));
  };

  const handleTorch = () => {
    setTorchOn(!isTorchOn);
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={Colors.purple3}
      />
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        cameraProps={{
          flashMode: isTorchOn
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off,
        }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={styles.mainText}>SCANNER QR</Text>
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

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
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

  mainText: {
    fontSize: 30,
    color: 'white',
  },
  midOverlayContainer: {
    flexDirection: 'row',
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
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
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 99,
  },

  rightIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 99,
  },
  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default QRScanner;
