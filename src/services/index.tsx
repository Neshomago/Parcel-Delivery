import axios from 'axios';
import { getDataFromStorage } from '../utils';

export const API_URL = 'https://www.cintegrales.com.ar/seguimiento/API';
const token = getDataFromStorage('AUTH_TOKEN');

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { Authorization: `Bearer  ${token}` },
});

export const loginService = async (
  userName: string,
  password: string,
): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/auth.php`, {
    tx_login: userName,
    tx_pass: password,
  });
  return data;
};

export const getUserOrder = async (orderID: string): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/pedido.php?`, {
    id_segui: orderID,
  });
  return data;
};

export const getProviderOrders = async (user: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/pedidos.php?`, {
    tx_login: user,
  });
  return response.data;
};

export const getProviderOrder = async (orderID: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/pedido.php?`, {
    id_cpte: orderID,
  });
  return response.data;
};

export const updateProviderOrder = async (
  orderID: string,
  status: string,
  signature: string,
  comments: string,
): Promise<any> => {
  const response = await axios.put(`${API_URL}/pedido.php?`, {
    id_cpte: orderID,
    id_estado: status,
    bl_firma: signature,
    tx_detalle: comments,
  });
  return response.data;
};
