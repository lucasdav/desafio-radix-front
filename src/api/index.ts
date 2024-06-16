import axios from 'axios';

//const apiURL = 'http://localhost:8000';
const apiURL = 'https://desafio-radix-api.vercel.app/';

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Verifica se a request tem código de não atutorizada e se a tem uma flag para tentar novamente a requisição
    if (error?.response?.status === 401 && !originalRequest?.__isRetryRequest) {
      originalRequest.retry = true;
      originalRequest.__isRetryRequest = true;  

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
