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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={handleStatusImages(status, isDisabled)}
          />
        </View>
        <View style={styles.statusData}>
          <Text style={[styles.text, isDisabled && styles.disabledText]}>
            {`${date}  -`}
          </Text>
          <Text style={[styles.text, isDisabled && styles.disabledText]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomerOrder;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  imageContainer: {},
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  statusData: {
    flexDirection: 'row',
  },
  text: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.white,
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
