import React, { useContext } from 'react';
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

const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor={Colors.white}
        inactiveColor={Colors.white}
        shifting={true}>
        <Tab.Screen
          name="MainScreen"
          component={CustomerStackNav}
          options={{
            tabBarLabel: 'Clientes',
            tabBarColor: Colors.purple,
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
            tabBarColor: Colors.purple,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons color={color} name="truck" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const CustomerStackNav = () => {
  const Stack = createStackNavigator();
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
        name="QRCodeCustomer"
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

const ProviderStackNav = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const Stack = createStackNavigator();
  return (
    <ContextProvider>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'OrdersScreen' : 'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Log In Transportistas',
            headerStyle: {
              backgroundColor: Colors.purple2,
              elevation: 0,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              alignSelf: 'center',
            },
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

export default Navigation;
