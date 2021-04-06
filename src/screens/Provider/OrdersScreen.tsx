import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { getProviderOrders } from '../../services';
import Order from '../../components/Provider/Order';
// import { getDataFromStorage } from '../../utils';
import Colors from '../../constants/Colors';

const Orders = ({ navigation, route }: any) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { userName } = route.params;

  // const getToken = async () => {
  //   const token = await getDataFromStorage('AUTH_TOKEN');
  //   console.log('token', token);
  // };

  const getOrders = async () => {
    if (!userName) return;
    setLoading(true);
    await getProviderOrders(userName)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('err', err));

    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.barItems}>
          <TouchableNativeFeedback>
            <AntDesign
              name="user"
              size={24}
              color={Colors.white}
              style={styles.icon}
              onPress={() => {}}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <Fontisto
              name="spinner-refresh"
              size={24}
              color={Colors.white}
              style={styles.icon}
              onPress={getOrders}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <Fontisto
              name="map"
              size={22}
              color={Colors.white}
              style={styles.icon}
              onPress={() => navigation.navigate('MapScreen', { orders })}
            />
          </TouchableNativeFeedback>
        </View>
      </View>
      <ScrollView>
        {isLoading ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color={Colors.purple2} />
          </View>
        ) : (
          orders &&
          orders.map((order) => <Order key={order.id_cpte} data={order} />)
        )}
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.dark,
  },
  topBar: {
    width: '100%',
    backgroundColor: Colors.purple2,
  },
  barItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  icon: {},
  indicatorContainer: {
    flex: 1,
    marginTop: 10,
  },
});
