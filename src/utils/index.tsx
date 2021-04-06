import AsyncStorage from '@react-native-async-storage/async-storage';
import preparingImage from '../../assets/preparing.png';
import deliveringImage from '../../assets/delivering.png';
import disDeliveringImage from '../../assets/delivering_disabled.png';
import deliveredImage from '../../assets/delivered.png';
import disDeliveredImage from '../../assets/delivered_disabled.png';

import naviraImage from '../../assets/navira.png';

export const handleStatusImages = (
  status: string,
  isDisabled: boolean = false,
) => {
  switch (status) {
    case 'Preparado':
      return preparingImage;
    case 'En Camino':
      return isDisabled ? disDeliveringImage : deliveringImage;
    case 'Entregado':
      return isDisabled ? disDeliveredImage : deliveredImage;
    case 'No Entregado':
      return naviraImage;
    default:
      return preparingImage;
  }
};

export const setDataInStorage = (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    AsyncStorage.setItem(key, data);
  } catch (e) {
    console.error('Error while trying to save data in local storage', e);
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) return data;
  } catch (e) {
    console.error('Error while trying to get data from local storage', e);
  }
};
