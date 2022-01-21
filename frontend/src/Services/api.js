/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/',
});
export default api;