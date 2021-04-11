import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { getProviderOrders } from '../../services';
import ProviderOrder from '../../components/ProviderOrder';
// import { getDataFromStorage } from '../../utils';
import Colors from '../../constants/Colors';
import { ProviderStackParams, IOrder } from '../../navigation';

interface Props {
  route: RouteProp<ProviderStackParams, 'OrdersScreen'>;
  navigation: StackNavigationProp<ProviderStackParams>;
}

const OrdersScreen = ({ navigation, route }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setLoading] = useState(false);

  const { userName } = route.params;

  // const getToken = async () => {
  //   const token = await getDataFromStorage('AUTH_TOKEN');
  //   console.log('token', token);
  // };

  const getOrders = async (): Promise<any> => {
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
          <TouchableOpacity>
            <AntDesign
              name="user"
              size={24}
              color={Colors.white}
              style={styles.icon}
              onPress={() => {}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto
              name="spinner-refresh"
              size={24}
              color={Colors.white}
              style={styles.icon}
              onPress={getOrders}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto
              name="map"
              size={22}
              color={Colors.white}
              style={styles.icon}
              onPress={() => navigation.navigate('MapScreen', { orders })}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {isLoading ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color={Colors.purple2} />
          </View>
        ) : (
          orders &&
          orders.map((order) => (
            <ProviderOrder
              key={order.id_cpte}
              data={order}
              navigation={navigation}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

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
