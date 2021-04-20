import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { handleStatusImages } from '../utils';
import Colors from '../constants/Colors';

interface Props {
  date: string;
  status: string;
  isFirst: boolean;
  isDisabled: boolean;
}
const CustomerOrder = ({ date, status, isFirst, isDisabled }: Props) => {
  return (
    <View style={styles.container}>
      {!isFirst && (
        <FeatherIcon
          style={[styles.icon, isDisabled && styles.disabledText]}
          name={'chevrons-down'}
          size={35}
        />
      )}

      <View style={styles.infoContainer}>
        <Image
          style={styles.image}
          source={handleStatusImages(status, isDisabled)}
        />
        <View style={styles.statusData}>
          <Text
            style={[
              styles.text,
              styles.statusText,
              isDisabled && styles.disabledText,
            ]}>
            {status}
          </Text>
          <Text style={[styles.text, isDisabled && styles.disabledText]}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomerOrder;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  statusData: {
    marginLeft: 15,
  },
  text: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.white,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  disabledText: {
    color: Colors.inactive,
  },
  separator: {
    borderColor: '#000',
    borderWidth: 1.5,
    flex: 1,
  },
  icon: {
    marginTop: 5,
    color: Colors.white,
  },
});
