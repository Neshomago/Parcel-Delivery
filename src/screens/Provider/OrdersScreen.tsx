import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';

import { getProviderOrders } from '../../services';
import ProviderOrder from '../../components/ProviderOrder';
import Colors from '../../constants/Colors';
import { StackParams, IOrder } from '../../navigation/types';

interface Props {
  route: RouteProp<StackParams, 'OrdersScreen'>;
  navigation: StackNavigationProp<StackParams>;
}

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const OrdersScreen = ({ navigation, route }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setLoading] = useState(false);

  const { userName } = route.params;

  // const getToken = async () => {
  //   const token = await getDataFromStorage('AUTH_TOKEN');
  //   console.log('token', token);
  // };

  const getOrders = async () => {
    if (!userName) return;
    setLoading(true);
    const response = await getProviderOrders(userName);
    if (!response) {
      console.error('Error getting order. Status code: ', response.status);
      return;
    }

    setOrders(response.data);

    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={Colors.purple2}
      />
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
              name="map"
              size={22}
              color={Colors.white}
              style={styles.icon}
              onPress={() => navigation.navigate('MapScreen', { orders })}
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
  },
  icon: {
    padding: 20,
  },
  indicatorContainer: {
    flex: 1,
    marginTop: 10,
  },
});
