import axios from 'axios';

export const API_URL = 'https://www.cintegrales.com.ar/seguimiento/API';

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
  const response = await axios.post(`${API_URL}/pedido.php?`, {
    id_segui: orderID,
  });
  return response;
};

export const getProviderOrders = async (
  user: string,
  token: string,
): Promise<any> => {
  const response = await axios.post(`${API_URL}/pedidos.php?`, {
    tx_login: user,
    jwt: token,
  });
  return response;
};

export const getProviderOrder = async (
  orderID: string,
  token: string,
): Promise<any> => {
  const response = await axios.post(`${API_URL}/pedido.php?`, {
    id_cpte: orderID,
    jwt: token,
  });
  return response;
};

export const updateProviderOrder = async (
  orderID: string,
  token: string,
  status: string,
  signature: string,
  comments: string,
): Promise<any> => {
  const response = await axios.put(`${API_URL}/pedido.php?`, {
    id_cpte: orderID,
    jwt: token,
    id_estado: status,
    bl_firma: signature,
    tx_detalle: comments,
  });
  return response;
};
