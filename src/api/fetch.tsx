import { getToken } from './token';

const getHeaders = async () => {
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    // @ts-ignore
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const post = async (destination: any, body: any) => {
  const headers = await getHeaders();

  const result = await fetch(`${process.env.API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  console.log(result);

  if (result.ok) {
    return await result.json();
  }
  throw { error: result.status };
};

export const get = async (destination: any) => {
  const headers = await getHeaders();

  const result = await fetch(`${process.env.API_URL}${destination}`, {
    method: 'GET',
    headers,
  });

  if (result.ok) {
    return await result.json();
  }

  throw { error: result.status };
};

export const getOrders = async () => {
  const token = await getToken();

  if (token !== 'successful_fake_token') {
    return mockFailure({ error: 401, message: 'Invalid Request' });
  }

  return mockSuccess({
    orders: ['prueba'],
  });
};
