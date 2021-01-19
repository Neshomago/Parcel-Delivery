import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const OrderHistory = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Hola</Text>
      </View>
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
