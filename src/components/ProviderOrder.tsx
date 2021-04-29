import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import { isOrderDelivered } from '../utils';
import Colors from '../constants/Colors';
import { StackParams } from '../navigation/types';
interface IProps {
  data: {
    id_cpte: string;
    nombre_cliente: string;
    direccion: string;
    nu_paquetes: string;
    id_estado: string;
    latitud: string;
    longitud: string;
  };
  navigation: StackNavigationProp<StackParams>;
}

const ProviderOrder = ({ data, navigation }: IProps) => {
  const { id_cpte, nombre_cliente, direccion, nu_paquetes, id_estado } = data;

  const handleTouch = (): void => {
    id_cpte && navigation.navigate('OrderScreen', { id_cpte });
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <TouchableNativeFeedback onPress={handleTouch}>
        <View style={styles.container}>
          <View style={isOrderDelivered(id_estado) && styles.overlay} />
          <View style={styles.topContainer}>
            <Text style={styles.topText}>N°: {id_cpte}</Text>
          </View>

          <View style={styles.middleContainer}>
            <Text style={[styles.text, styles.bold]}>{nombre_cliente}</Text>
          </View>
          <View style={styles.bottomContainer}>
            {isOrderDelivered(id_estado) && (
              <MaterialCommunityIcons
                style={styles.icon}
                name="check-bold"
                size={33}
              />
            )}
            <Text style={styles.text}>{direccion}</Text>
            <View style={styles.bottomRightContainer}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={20}
                color={Colors.white}
              />
              <Text style={styles.text}>{nu_paquetes}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default ProviderOrder;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderColor: Colors.purple2,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  topContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  topText: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.whitish,
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    color: Colors.whitish,
    fontSize: 18,
    textAlign: 'center',
  },

  bold: {
    fontWeight: 'bold',
  },

  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  icon: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    color: Colors.lightGreen,
  },

  bottomRightContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
});
