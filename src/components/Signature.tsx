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

const Signature = ({ shown, hideModal, setEncodedUrl }) => {
  const ref = useRef();

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
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Modal animationType="fade" visible={shown}>
        <View style={styles.container}>
          <SignatureCapture
            style={styles.signature}
            ref={ref}
            viewMode={'portrait'}
            showNativeButtons={false}
            saveImageFileInExtStorage={false}
            onSaveEvent={handleSaveEvent}
          />

          <View style={styles.buttons}>
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
    width: '100%',
  },
  signature: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
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
  modalContainer: {
    flex: 1,
  },
  modalText: {},
  modalButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'blue',
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 22,
  },
});
