import { post } from './fetch';

export const login = (userName: string, password: string) => {
  return post('/users/login', {
    user: { userName, password },
  });
};
