import axios from 'axios';

const baseUrl = 'afiliate800k-api.onrender.com/';
console.log(baseUrl);

const Api = axios.create({
   baseURL: baseUrl,
   withCredentials: true,
});

export default Api;
