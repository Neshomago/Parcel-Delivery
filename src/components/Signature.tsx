import React, { useRef } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors';

interface Props {
  shown: boolean;
  hideModal: () => void;
  setEncodedUrl: (result: any) => void;
}

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Signature = ({ shown, hideModal, setEncodedUrl }: Props) => {
  const ref: any = useRef();

  const saveImage = () => {
    ref.current.saveImage();
  };

  const resetImage = () => {
    ref.current.resetImage();
  };

  const handleSaveEvent = (result: any) => {
    setEncodedUrl(result.encoded);
    hideModal();
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={Colors.overlay}
      />
      <Modal animationType="fade" visible={shown} transparent={true}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            style={styles.icon}
            name={'close-thick'}
            size={40}
            onPress={() => hideModal()}
          />
          <View onTouchStart={() => hideModal()} style={styles.overlay} />
          <SignatureCapture
            style={styles.signature}
            ref={ref}
            viewMode={'portrait'}
            showNativeButtons={false}
            saveImageFileInExtStorage={false}
            onSaveEvent={handleSaveEvent}
          />

          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                saveImage();
              }}>
              <Text>Guardar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                resetImage();
              }}>
              <Text>Limpiar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Signature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: 'red',
    zIndex: 20,
    position: 'absolute',
    right: 10,
    top: 0,
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.overlay,
  },

  signature: {
    width: '95%',
    height: '60%',
    zIndex: 10,
  },

  buttonsContainer: {
    width: '95%',
    flexDirection: 'row',
    zIndex: 20,
    backgroundColor: Colors.white,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
});
