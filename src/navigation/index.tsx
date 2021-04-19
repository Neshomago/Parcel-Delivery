import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthProvider } from '../hooks/useAuth';
import MainScreen from '../screens/Customer/MainScreen';
import StatusScreen from '../screens/Customer/StatusScreen';
import HistoryScreen from '../screens/Customer/HistoryScreen';
import LoginScreen from '../screens/Provider/LoginScreen';
import OrdersScreen from '../screens/Provider/OrdersScreen';
import OrderScreen from '../screens/Provider/OrderScreen';
import MapScreen from '../screens/Provider/MapScreen';
import QRScanner from '../components/QRScanner';
import Colors from '../constants/Colors';

import { StackParams, TabParams } from './types';

const StackNavigation = () => {
  const Stack = createStackNavigator<StackParams>();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName={'MainScreen'}>
          <Stack.Screen
            name="MainScreen"
            component={TabNavigation}
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
              headerShown: false,
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
      </AuthProvider>
    </NavigationContainer>
  );
};

const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator<TabParams>();

  return (
    <Tab.Navigator
      activeColor={Colors.white}
      inactiveColor={Colors.white}
      shifting={true}
      barStyle={styles.bottomBar}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} name="account" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Transportistas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} name="truck" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
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

export default StackNavigation;
