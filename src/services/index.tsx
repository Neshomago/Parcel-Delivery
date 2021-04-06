import axios from 'axios';
import { getDataFromStorage } from '../utils';

export const API_URL = 'https://www.cintegrales.com.ar/seguimiento/API';
const token = getDataFromStorage('AUTH_TOKEN');

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { Authorization: `Bearer  ${token}` },
});

export const logIn = (userName: string, password: string): Promise<any> => {
  return axios.post(`${API_URL}/auth.php`, {
    tx_login: userName,
    tx_pass: password,
  });
};

export const getUserOrder = (orderID: string): Promise<any> => {
  return axios.post(`${API_URL}/pedido.php?`, {
    id_segui: orderID,
  });
};

export const getProviderOrders = (user: string): Promise<any> => {
  return axios.post(`${API_URL}/pedidos.php?`, {
    tx_login: user,
  });
};

export const getProviderOrder = (orderID: string): Promise<any> => {
  return axios.post('/pedido.php?', {
    id_cpte: orderID,
  });
};
