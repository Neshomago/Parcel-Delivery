import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
  handleLogout: () => void;
}

const UserConfig = ({ handleLogout }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <TouchableNativeFeedback onPress={() => handleLogout()}>
          <View style={styles.item}>
            <Text style={styles.text}>Cerrar Sesion</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default UserConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  items: {},
  item: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: Colors.purple3,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 25,
  },
});
