import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

import Colors from '../../constants/Colors';
import Constants from '../../constants/Constants';
import Signature from './Signature';

interface Props {
  data: {
    id_cpte: string;
    nombre_cliente: string;
    direccion: string;
    nu_paquetes: string;
    latitud: string;
    longitud: string;
  };
  visible: boolean;
  toggleModal: () => void;
  orderStatus: string;
  setOrderStatus: (status: string) => void;
}

const OrderModal: React.FC<Props> = ({
  data,
  visible,
  toggleModal,
  orderStatus,
  setOrderStatus,
}) => {
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<any>('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const {
    id_cpte,
    nombre_cliente,
    direccion,
    nu_paquetes,
    latitud,
    longitud,
  } = data;

  const handleBack = () => {
    toggleModal();
  };

  const handleSubmit = () => {
    if (status === 'Seleccione un estado') {
      Alert.alert('Debe seleccionar un estado');
      return;
    }

    if (!signatureUrl && !comments) {
      Alert.alert('La entrega debe estar firmada y/o comentada');
      return;
    }

    setOrderStatus(status);
    toggleModal();
  };

  const toggleSignatureModal = () => {
    setSignatureModalOpen(!signatureModalOpen);
  };

  const setEncodedUrl = (url: any) => {
    setSignatureUrl(url);
  };

  useEffect(() => {
    signatureUrl && setStatus('Entregado');
  }, [signatureUrl]);

  return (
    <View>
      <Modal animationType="fade" visible={visible}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableWithoutFeedback
              style={styles.iconContainer}
              onPress={handleBack}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="arrow-left-thick"
                size={33}
                color={Colors.whitish}
              />
            </TouchableWithoutFeedback>
            <View style={styles.info}>
              <Text style={styles.title}>O.N: {id_cpte}</Text>
              <Text style={styles.customerName}>{nombre_cliente}</Text>
              <Text style={styles.text}>{direccion}</Text>
              <Text style={styles.text}>
                {nu_paquetes} {nu_paquetes === '1' ? 'paquete' : 'paquetes'}
              </Text>
              {signatureUrl ? (
                <View style={styles.signatureContainer}>
                  <Image
                    resizeMode={'stretch'}
                    style={styles.signatureImage}
                    source={{ uri: `data:image/jpeg;base64,${signatureUrl}` }}
                  />
                </View>
              ) : (
                <View style={styles.mapContainer}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                      latitude: parseFloat(latitud),
                      longitude: parseFloat(longitud),
                      latitudeDelta: 0.0112, //Check this values. Marker is not being centered properly
                      longitudeDelta: 0.0075, //Check this values. Marker is not being centered properly
                    }}>
                    <Marker
                      coordinate={{
                        latitude: parseFloat(latitud),
                        longitude: parseFloat(longitud),
                      }}
                    />
                  </MapView>
                </View>
              )}
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  setSignatureModalOpen(true);
                }}>
                <Text style={styles.buttonText}>
                  {!signatureUrl ? 'Firma' : 'Editar Firma'}
                </Text>
              </TouchableHighlight>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={status}
                  //@ts-ignore
                  onValueChange={(itemValue) => setStatus(itemValue)}>
                  <Picker.Item
                    enabled={false}
                    color={Colors.inactive}
                    label="Seleccione un estado"
                    value="Seleccione un estado"
                  />
                  <Picker.Item label="Volver a pasar" value="Volver a pasar" />
                  <Picker.Item label="Entregado" value="Entregado" />
                  <Picker.Item label="Rechazado" value="Rechazado" />
                </Picker>
              </View>

              <TextInput
                style={styles.textInput}
                textAlignVertical="top"
                placeholder="Comentarios"
                placeholderTextColor={Colors.whitish}
                selectionColor={Colors.purple}
                underlineColorAndroid="transparent"
                multiline
                numberOfLines={5}
                value={comments}
                onChangeText={(text) => setComments(text)}
              />
              {orderStatus ? (
                <TouchableHighlight
                  style={[
                    styles.button,
                    {
                      backgroundColor: Colors.mediumBlue,
                    },
                  ]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Modificar</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  style={[
                    styles.button,
                    {
                      backgroundColor: Colors.lightGreen,
                    },
                  ]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Finalizar</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Signature
        shown={signatureModalOpen}
        hideModal={toggleSignatureModal}
        setEncodedUrl={setEncodedUrl}
      />
    </View>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },

  iconContainer: {
    padding: 16,
  },

  icon: {
    position: 'absolute',
    left: 5,
    top: 5,
  },

  info: {
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: Colors.white,
  },

  customerName: {
    fontSize: 28,
    color: Colors.whitish,
  },

  text: {
    fontSize: 20,
    color: Colors.whitish,
  },

  signatureContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },

  signatureImage: {
    height: 300,
    width: 300,
  },

  mapContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 25,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  button: {
    backgroundColor: '#2196F3',
    borderRadius: Constants.borderRadius * 2,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    padding: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },

  pickerContainer: {
    width: '90%',
    borderColor: Colors.purple2,
    borderWidth: Constants.borderWidth,
    alignItems: 'center',
    marginTop: 20,
  },

  picker: {
    width: '100%',
    borderWidth: 3,
    color: Colors.whitish,
  },

  textInput: {
    width: '90%',
    borderColor: Colors.purple2,
    borderWidth: Constants.borderWidth,
    fontSize: 18,
    paddingLeft: 15,
    backgroundColor: Colors.dark,
    marginVertical: 10,
    color: Colors.whitish,
  },
  boldText: {
    fontWeight: '700',
  },
});
