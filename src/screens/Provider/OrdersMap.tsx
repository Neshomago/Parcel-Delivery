import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const OrdersMap = () => {
  return (
    <View style={styles.container}>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: state[0].latitude,
          longitude: state[0].longitude,
          latitudeDelta: 0.0112, //Check this values. Marker is not being centered properly
          longitudeDelta: 0.0075, //Check this values. Marker is not being centered properly
        }}>
        {state.map((data) => (
          <Marker
            key={data.orderNumber}
            identifier={data.orderNumber.toString()}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={data.customerName}
            description={`Orden No ${data.orderNumber.toString()}`}
            onCalloutPress={() => {}}
          />
        ))}
      </MapView> */}
      <Text>Hola</Text>
    </View>
  );
};

export default OrdersMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
