import axios from 'axios';

const api = axios.create({
    baseURL:'http://oralmax.eu/'
});

export default api;
