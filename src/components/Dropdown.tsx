import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../constants/Colors';

interface Props {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ status, setStatus }: Props) => {
  return (
    <Picker
      style={styles.picker}
      //@ts-ignore
      onValueChange={(itemValue) => setStatus(itemValue)}
      selectedValue={status}>
      <Picker.Item
        enabled={false}
        color={Colors.inactive}
        label="Seleccione un estado"
        value="Seleccione un estado"
      />
      <Picker.Item label="Conformado (T)" value="4" />
      <Picker.Item label="Observado por rotura" value="5" />
      <Picker.Item label="Devolucion a deposito" value="6" />
      <Picker.Item label="Devolucion a remitente" value="7" />
      <Picker.Item label="Redespacho" value="8" />
      <Picker.Item label="Observado por Faltante" value="9" />
      <Picker.Item label="Devolucion parcial" value="14" />
      <Picker.Item label="Conforme TE" value="18" />
      <Picker.Item label="Recibido y conformado" value="21" />
      <Picker.Item label="Entrega parcial" value="24" />
    </Picker>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    borderWidth: 3,
    color: Colors.whitish,
  },
});
