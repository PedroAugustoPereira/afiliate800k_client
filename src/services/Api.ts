import axios from 'axios';

const baseUrl = 'https://afiliate800k-api.vercel.app/';
console.log(baseUrl);

const Api = axios.create({
   baseURL: baseUrl,
   withCredentials: true,
});

export default Api;
