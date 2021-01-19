import React, { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker as Select } from '@react-native-community/picker'; //This has an alias because it was throwing a conflict between RNCommunity and

import Colors from '../constants/Colors';
import Constants from '../constants/Constants';
import Signature from './Signature';

const OrderModal: React.FC = ({ visible, toggleModal }) => {
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState('');
  const [status, setStatus] = useState('');
  const [delivered, setDelivered] = useState(false);

  const handleBack = () => {
    toggleModal();
  };

  const toggleOpenSignatureModal = () => {
    setSignatureModalOpen(!signatureModalOpen);
  };

  const setEncodedUrl = (url) => {
    setSignatureUrl(url);
  };

  useEffect(() => {
    signatureUrl && setStatus('Entregado');
  }, [signatureUrl]);

  return (
    <View>
      <Modal animationType="fade" visible={visible}>
        <ScrollView>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              style={styles.modalTouchableIcon}
              onPress={handleBack}>
              <MaterialCommunityIcons
                style={styles.modalIcon}
                name="arrow-left-thick"
                size={33}
                color="black"
              />
            </TouchableWithoutFeedback>
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>Orden N°: {orderNumber}</Text>
              <Text style={styles.modalName}>{customerName}</Text>
              <Text style={styles.modalText}>
                {address}, <Text style={styles.boldText}>{neighbourhood}</Text>
              </Text>
              <Text style={styles.modalText}>
                {packagesNum} {packagesNum === 1 ? 'paquete' : 'paquetes'}
              </Text>
              {signatureUrl ? (
                <View style={styles.modalSignatureContainer}>
                  <Image
                    resizeMode={'stretch'}
                    style={styles.modalImage}
                    source={{ uri: `data:image/jpeg;base64,${signatureUrl}` }}
                  />
                </View>
              ) : (
                <>
                  <View style={styles.modalMapContainer}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.modalMap}
                      initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0112, //Check this values. Marker is not being centered properly
                        longitudeDelta: 0.0075, //Check this values. Marker is not being centered properly
                      }}>
                      <Marker
                        coordinate={{
                          latitude: latitude,
                          longitude: longitude,
                        }}
                        title={'Prueba'}
                        description={'Description prueb'}
                      />
                    </MapView>
                  </View>
                  <TouchableHighlight
                    style={styles.modalButton}
                    onPress={() => {
                      setSignatureModalOpen(true);
                    }}>
                    <Text style={styles.modalButtonText}>Firma</Text>
                  </TouchableHighlight>
                </>
              )}
              <View style={styles.modalPickerContainer}>
                <Select
                  style={styles.modalPicker}
                  selectedValue={status}
                  onValueChange={(itemValue, itemIndex) =>
                    setStatus(itemValue)
                  }>
                  <Select.Item label="Volver a pasar" value="Volver a pasar" />
                  <Select.Item label="Entregado" value="Entregado" />
                  <Select.Item label="Rechazado" value="Rechazado" />
                </Select>
              </View>

              <TextInput
                style={styles.modalTextInput}
                label="Comentarios"
                underlineColorAndroid="transparent"
                placeholderTextColor="grey"
                multiline={true}
                numberOfLines={5}
                mode={'outlined'}
              />
              <TouchableHighlight
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: Colors.lightGreen,
                  },
                ]}
                onPress={() => {
                  setModalVisible(false);
                  setDelivered(true);
                }}>
                <Text style={[styles.modalButtonText, { color: Colors.white }]}>
                  Finalizar
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Signature
        shown={signatureModalOpen}
        hideModal={toggleOpenSignatureModal}
        setEncodedUrl={setEncodedUrl}
      />
    </View>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  modalTouchableIcon: {
    padding: 16,
  },

  modalIcon: {
    position: 'absolute',
    left: 5,
    top: 5,
  },

  modalInfo: {
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 30,
    color: Colors.darkText,
  },

  modalName: {
    fontSize: 28,
    color: Colors.darkText,
  },

  modalText: {
    fontSize: 20,
    color: Colors.darkText,
  },

  modalMapContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 25,
  },

  modalSignatureContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },

  modalImage: {
    height: 300,
    width: 300,
  },

  modalMap: {
    width: '100%',
    height: '100%',
  },

  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: Constants.borderRadius * 2,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    padding: 10,
  },

  modalButtonText: {
    color: Colors.white,
    fontSize: 18,
  },

  modalPickerContainer: {
    width: '90%',
    borderColor: Colors.topColor,
    borderWidth: Constants.borderWidth,
    alignItems: 'center',
    marginTop: 20,
  },

  modalPicker: {
    width: '100%',
    borderWidth: 3,
  },

  modalTextInput: {
    width: '90%',
    fontSize: 18,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
