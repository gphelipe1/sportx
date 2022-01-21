import jwt from 'jwt-decode';
import api from './api';

export const TOKEN_KEY = '@sportx-Token';
export const USER_KEY = '@sportx-User';

export const getUser = () => localStorage.getItem(USER_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (token === null) {
    return false;
  }
  const tokenDecoded = jwt(token.replace('Bearer ', ''));
  if (Date.now() < tokenDecoded.exp * 1000) {
    return true;
  }
  logout();
  return false;
};

const tokenStorage = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const userStorage = user => {
  localStorage.setItem(USER_KEY, user);
};

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, async error => {
  console.log(error);
});

export async function signIn(valueForm) {
  try {
    const response = await api.post('/v1/user/login', valueForm);
    tokenStorage(response.data.token);
    userStorage(valueForm.username);
    return response;
  } catch (err) {
    return {
      has_error: true,
      err
    };
  }
}
