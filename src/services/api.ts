import axios from 'axios';

const api = axios.create({
    baseURL:'http://18.204.19.126/'
});

export default api;
