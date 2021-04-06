import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';

interface Props {
  route: any;
  navigation: any;
}

interface Order {
  id_cpte: string;
  id_estado: string;
  nombre_cliente: string;
  direccion: string;
  nu_paquetes: string | number;
  latitud: string;
  longitud: string;
}

const OrdersMap: FC<Props> = ({ navigation, route }) => {
  const { orders } = route.params;
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="arrow-left-thick"
          size={33}
          color={Colors.black}
        />
      </TouchableWithoutFeedback>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(orders[0].latitud),
          longitude: parseFloat(orders[0].longitud),
          latitudeDelta: 0.0112, //Check this values. Marker is not being centered properly
          longitudeDelta: 0.0075, //Check this values. Marker is not being centered properly
        }}>
        {orders.map((order: Order) => (
          <Marker
            key={order.id_cpte}
            identifier={order.id_cpte}
            pinColor={
              order.id_estado === 'Entregado' ? Colors.lightGreen : Colors.red
            }
            coordinate={{
              latitude: parseFloat(order.latitud),
              longitude: parseFloat(order.longitud),
            }}
            title={order.nombre_cliente}
            description={`Orden No ${order.id_cpte}`}
            onCalloutPress={() => {
              Alert.alert('Esto debe llevar al modal de la orden');
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default OrdersMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 99,
  },
  map: {
    flex: 1,
  },
});
