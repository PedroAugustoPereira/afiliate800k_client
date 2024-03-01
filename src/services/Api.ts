import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = 'https://afiliate800k-api.onrender.com/';
console.log(baseUrl);

const Api = axios.create({
   baseURL: baseUrl,
   withCredentials: true,
});

Api.interceptors.request.use(function (config) {
   const token = Cookies.get('accessToken');
   console.log(token);
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
});

export default Api;
