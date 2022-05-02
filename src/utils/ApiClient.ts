import axios, { AxiosError, Method } from 'axios';
import Toast from './Toast';

const request = async (
  method: Method,
  path: string,
  data?: any
): Promise<any> => {
  const request = await axios({
    method,
    url: `http://localhost:3000${path}`,
    data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((e: AxiosError) => {
      return e.response?.data;
    });
  return request;
};

export default request;
