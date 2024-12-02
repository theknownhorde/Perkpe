import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5003/api',
    // baseURL:  'http://node-backend:5003/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
