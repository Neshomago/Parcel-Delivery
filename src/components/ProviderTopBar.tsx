import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParams, IOrder } from '../navigation/types';

import Colors from '../constants/Colors';

interface IProps {
  //   navigation: StackNavigationProp<StackParams>;
  isConfigOpen: boolean;
  setConfigOpen: (isConfigOpen: boolean) => void;
  orders: IOrder[];
  getOrders: () => void;
}

const ProviderTopBar = ({
  //   navigation,
  isConfigOpen,
  setConfigOpen,
  orders,
  getOrders,
}: IProps) => {
  const navigation = useNavigation();

  return (
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
  );
};

export default ProviderTopBar;

const styles = StyleSheet.create({
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
});
