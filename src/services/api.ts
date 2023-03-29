import axios from 'axios';

const api = axios.create({
    baseURL:'https://fe9e-190-89-159-141.sa.ngrok.io'
});

export default api;
