import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
  },{ synchronous: true });
export default instance;