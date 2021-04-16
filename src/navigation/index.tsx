import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext, ContextProvider } from '../context';
import MainScreen from '../screens/Customer/MainScreen';
import StatusScreen from '../screens/Customer/StatusScreen';
import HistoryScreen from '../screens/Customer/HistoryScreen';
import LoginScreen from '../screens/Provider/LoginScreen';
import OrdersScreen from '../screens/Provider/OrdersScreen';
import OrderScreen from '../screens/Provider/OrderScreen';
import MapScreen from '../screens/Provider/MapScreen';
import QRScanner from '../components/QRScanner';
import Colors from '../constants/Colors';

export type TabParams = {
  MainScreen: undefined;
  ProviderScreen: undefined;
};

const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator<TabParams>();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MainScreen"
        activeColor={Colors.white}
        inactiveColor={Colors.white}
        shifting={true}
        barStyle={styles.bottomBar}>
        <Tab.Screen
          name="MainScreen"
          component={CustomerStackNav}
          options={{
            tabBarLabel: 'Clientes',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons color={color} name="account" size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="ProviderScreen"
          component={ProviderStackNav}
          options={{
            tabBarLabel: 'Transportistas',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons color={color} name="truck" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

interface HistInterface {
  fecha: string;
  estado: string;
}

interface MainScreenInterface {
  data: { id_segui: string; estadoHist: HistInterface[] };
}

export type CustomerStackParams = {
  MainScreen: MainScreenInterface;
  StatusScreen: any;
  QRScanner: undefined;
  HistoryScreen: { orderNumber: string; history: HistInterface[] };
};

const CustomerStackNav = () => {
  const Stack = createStackNavigator<CustomerStackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="StatusScreen"
        component={StatusScreen}
        options={{
          title: '',
          animationEnabled: false,
          headerStyle: {
            backgroundColor: Colors.purple3,
            elevation: 0,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'Historial de orden numero:',
          animationEnabled: false,
          headerStyle: {
            backgroundColor: Colors.purple3,
            elevation: 0,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export interface IOrder {
  id_cpte: string;
  id_estado: string;
  nombre_cliente: string;
  direccion: string;
  nu_paquetes: string;
  latitud: string;
  longitud: string;
  tx_detalle: string;
  bl_firma: string;
}

export type ProviderStackParams = {
  LoginScreen: { userName: string };
  OrdersScreen: { userName: string };
  OrderScreen: { id_cpte: string };
  MapScreen: { orders: IOrder[] };
};

const ProviderStackNav = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const Stack = createStackNavigator<ProviderStackParams>();
  return (
    <ContextProvider>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'OrdersScreen' : 'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrdersScreen"
          component={OrdersScreen}
          options={() => ({
            title: 'Ordenes de entrega',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: Colors.purple2,
              elevation: 0,
            },
            headerTintColor: Colors.white,
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
  },
});

export default Navigation;
