import axios, { AxiosError, AxiosResponse } from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

const defaultConfig = {
  withCredentials: true,
  baseURL,
};

const onRejected = (error: AxiosError) => {
  if (error.response?.status === 401) {
    console.log('error: ', error);
  }

  return error;
};

const DefaultAPIInstance = axios.create(defaultConfig);

DefaultAPIInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  onRejected,
);

export default DefaultAPIInstance;
