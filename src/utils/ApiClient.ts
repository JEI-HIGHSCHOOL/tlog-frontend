import axios, { AxiosError, Method } from 'axios';

const request = async (
  method: Method,
  path: string,
  data?: any,
  auth?: string
): Promise<any> => {
  const request = await axios({
    method,
    url: `http://localhost:3000${path}`,
    data,
    headers: {
      Authorization: auth ? 'Bearer ' + auth : '',
    },
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
