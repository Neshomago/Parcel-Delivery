import React, { useContext } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { LogInContext } from '../context/LogInContext';
import CustomerScreen from '../screens/Customer/CustomerScreen';
import OrderStatusScreen from '../screens/Customer/OrderStatusScreen';
import OrderHistory from '../screens/Customer/OrderHistory';
import LoginScreen from '../screens/Provider/LogInScreen';
import Orders from '../screens/Provider/Orders';
import OrdersMap from '../screens/Provider/OrdersMap';
import QRCode from '../components/QRCode';
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
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Order N° 123455',
          headerStyle: {
            backgroundColor: Colors.customerTopColor,
            elevation: 0,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

const ProviderStackNav = () => {
  const [isLoggedIn] = useContext(LogInContext);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Orders' : 'LoginScreen'}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
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
        options={({ navigation }) => ({
          title: 'Ordenes de entrega',
          headerStyle: {
            backgroundColor: Colors.topColor,
            elevation: 0,
          },
          headerTintColor: Colors.white,
          headerRight: () => (
            <TouchableNativeFeedback>
              <Fontisto
                name="map"
                size={22}
                color={Colors.white}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('OrdersMap')}
              />
            </TouchableNativeFeedback>
          ),
        })}
      />
      <Stack.Screen
        name="OrdersMap"
        component={OrdersMap}
        options={{
          title: '',
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
