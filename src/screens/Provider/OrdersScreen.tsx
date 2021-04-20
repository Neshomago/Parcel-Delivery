import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';

import { useAuth } from '../../hooks/useAuth';
import { getDataFromStorage, AUTH_DATA } from '../../utils';
import { getProviderOrders } from '../../services';
import ProviderOrder from '../../components/ProviderOrder';
import Colors from '../../constants/Colors';
import UserConfig from '../../components/UserConfig';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfigOpen, setConfigOpen] = useState(false);

  const { userName } = route.params;

  const auth = useAuth();

  const handleLogout = () => {
    auth.signout();
    navigation.navigate('LoginScreen');
  };

  const getOrders = async () => {
    if (!userName) return;
    setLoading(true);
    const storageData = await getDataFromStorage(AUTH_DATA);
    const { data } = await getProviderOrders(userName, storageData.jwt);
    if (!data) {
      setErrorMessage('Error al obtener orden');
      return;
    }

    setOrders(data);

    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={Colors.purple2}
        />
        <View style={styles.topBar}>
          <Text style={styles.title}>Ordenes de entrega</Text>
          <View style={styles.barItems}>
            <TouchableOpacity>
              <AntDesign
                name={isConfigOpen ? 'home' : 'user'}
                size={24}
                color={Colors.white}
                style={styles.icon}
                onPress={() => setConfigOpen(!isConfigOpen)}
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
          {isConfigOpen ? (
            <UserConfig handleLogout={handleLogout} />
          ) : isLoading ? (
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
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </ScrollView>
      </View>
    </>
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

  title: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 30,
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

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.red,
  },
});
