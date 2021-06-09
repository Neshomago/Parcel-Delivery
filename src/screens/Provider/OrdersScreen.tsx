import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { useAuth } from '../../hooks/useAuth';
import { getDataFromStorage, AUTH_DATA } from '../../utils';
import { getProviderOrders } from '../../services';
import ProviderTopBar from '../../components/ProviderTopBar';
import ProviderOrder from '../../components/ProviderOrder';
import Colors from '../../constants/Colors';
import UserConfig from '../../components/UserConfig';
import { StackParams, IOrder } from '../../navigation/types';

interface IProps {
  route: RouteProp<StackParams, 'OrdersScreen'>;
  navigation: StackNavigationProp<StackParams>;
}

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const OrdersScreen = ({ navigation, route }: IProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfigOpen, setConfigOpen] = useState(false);

  const { userName } = route.params;

  const auth = useAuth();

  const handleLogout = () => {
    auth.signout();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
      }),
    );
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
    setConfigOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <>
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={Colors.purple2}
        />
        <ProviderTopBar
          isConfigOpen={isConfigOpen}
          setConfigOpen={setConfigOpen}
          orders={orders}
          getOrders={getOrders}
        />
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
