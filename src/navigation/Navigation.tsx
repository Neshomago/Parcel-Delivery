import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomerScreen from '../screens/Customer/CustomerScreen';
import OrderStatusScreen from '../screens/Customer/OrderStatusScreen';
import Orders from '../screens/Provider/Orders';
import QRCode from '../components/QRCode';
import Login from '../screens/Provider/LogIn';
import Colors from '../constants/Colors';

const CustomerStackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerScreen"
        component={CustomerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderStatusScreen"
        component={OrderStatusScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.customerTopColor,
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
        component={QRCode}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProviderStackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Iniciar sesion',
          headerStyle: {
            backgroundColor: Colors.topColor,
            elevation: 0,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Ordenes de entrega',
          headerStyle: {
            backgroundColor: Colors.topColor,
            elevation: 0,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

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
          name="CustomerScreen"
          component={CustomerStackNav}
          options={{
            tabBarLabel: 'Clientes',
            tabBarColor: Colors.customerBottomColor,
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
            tabBarColor: Colors.bottomColor,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons color={color} name="truck" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
