import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
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
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import Constants from '../../constants/Constants';
import Signature from '../../components/Signature';
import { getDataFromStorage, AUTH_DATA, parseCodeToStatus } from '../../utils';
import { getProviderOrder, updateProviderOrder } from '../../services';
import { StackParams, IOrder } from '../../navigation/types';
import Dropdown from '../../components/Dropdown';

interface IProps {
  route: RouteProp<StackParams, 'OrderScreen'>;
  navigation: StackNavigationProp<StackParams>;
}

const OrderScreen = ({ navigation, route }: IProps) => {
  const [orderData, setOrderData] = useState<IOrder>({
    id_cpte: '',
    nombre_cliente: '',
    direccion: '',
    nu_paquetes: '',
    latitud: '0',
    longitud: '0',
    tx_detalle: '',
    id_estado: '',
    bl_firma: '',
  });
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMapShowing, setMapShowing] = useState(true);

  const { id_cpte } = route.params;
  const {
    nombre_cliente,
    direccion,
    nu_paquetes,
    latitud,
    longitud,
    id_estado,
    bl_firma,
  } = orderData;

  const toggleSignatureModal = (): void => {
    setSignatureModalOpen(!signatureModalOpen);
  };

  const setEncodedUrl = (url: any): void => {
    setSignatureUrl(url);
  };

  const getOrder = async () => {
    const storageData = await getDataFromStorage(AUTH_DATA);

    const { data } = await getProviderOrder(id_cpte, storageData?.jwt);
    if (!data) {
      setErrorMessage('Error obteniendo orden');
      return;
    }
    setOrderData(data);
    setSignatureUrl(data.bl_firma);
    setComments(data.tx_detalle);
  };

  const handleSubmit = async () => {
    const storageData = await getDataFromStorage(AUTH_DATA);

    if (!status) {
      Alert.alert('Debe seleccionar un estado');
      return;
    }
    if (!signatureUrl && !comments) {
      Alert.alert('La entrega debe estar firmada y/o comentada');
      return;
    }

    setLoading(true);
    try {
      await updateProviderOrder(
        id_cpte,
        storageData.jwt,
        status,
        signatureUrl,
        comments,
      );
    } catch {
      Alert.alert(
        'Error intentando guardar el pedido. Vuelva a intentar mas tarde',
      );
    }

    setLoading(false);
    navigation.goBack();
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_cpte]);

  useEffect(() => {
    if (signatureUrl || bl_firma) setMapShowing(false);
  }, [signatureUrl, bl_firma]);

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            style={styles.arrowIcon}
            name="arrow-left-thick"
            size={33}
            color={Colors.white}
          />
        </TouchableWithoutFeedback>
        <ScrollView>
          {errorMessage ? (
            <Text style={styles.errorText}>Error obteniendo pedidos.</Text>
          ) : null}
          <TouchableWithoutFeedback
            onPress={() => setSignatureModalOpen(false)}>
            <View style={styles.info}>
              <Text style={styles.title}>O.N: {id_cpte}</Text>
              <Text style={styles.customerName}>{nombre_cliente}</Text>
              <Text style={styles.text}>{direccion}</Text>
              <View style={styles.bottomContainer}>
                <TouchableWithoutFeedback
                  onPress={() => setMapShowing(!isMapShowing)}>
                  <MaterialCommunityIcons
                    name={
                      isMapShowing ? 'signature-freehand' : 'map-marker-radius'
                    }
                    size={35}
                    color={Colors.purple2}
                    style={styles.signatureMapIcon}
                  />
                </TouchableWithoutFeedback>
                <View>
                  <Text style={[styles.text, { color: Colors.lightGreen }]}>
                    {parseCodeToStatus(id_estado)}
                  </Text>
                </View>

                <View style={styles.packagesContainer}>
                  <MaterialCommunityIcons
                    name="package-variant-closed"
                    size={25}
                    color={Colors.white}
                    style={styles.packagesIcon}
                  />
                  <Text style={styles.packageText}>{nu_paquetes}</Text>
                </View>
              </View>

              <View style={styles.signatureMapContainer}>
                {isMapShowing ? (
                  <>
                    {orderData.latitud !== '0' ? (
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
                    ) : null}
                  </>
                ) : (
                  <Image
                    resizeMode={'stretch'}
                    style={styles.signatureImage}
                    source={{
                      uri: `data:image/jpeg;base64,${signatureUrl}`,
                    }}
                  />
                )}
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  setSignatureModalOpen(true);
                }}>
                <Text style={styles.buttonText}>Firma</Text>
              </TouchableHighlight>
              <View style={styles.pickerContainer}>
                <Dropdown status={status} setStatus={setStatus} />
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
              {isLoading ? (
                <View style={styles.indicator}>
                  <ActivityIndicator size="large" color={Colors.mediumBlue} />
                </View>
              ) : (
                <TouchableHighlight
                  style={[styles.button, styles.finishButton]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Finalizar</Text>
                </TouchableHighlight>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
      <Signature
        shown={signatureModalOpen}
        hideModal={toggleSignatureModal}
        setEncodedUrl={setEncodedUrl}
      />
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  arrowIcon: {
    paddingLeft: 10,
    paddingTop: 40,
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

  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  packagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  packagesIcon: {
    marginRight: 2,
  },

  packageText: {
    color: Colors.white,
    fontSize: 22,
  },

  signatureMapContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',
  },

  signatureImage: {
    height: 300,
    width: '100%',
  },

  signatureMapIcon: {},

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

  finishButton: {
    backgroundColor: Colors.lightGreen,
    marginBottom: 10,
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

  indicator: {
    flex: 1,
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.red,
  },
});
