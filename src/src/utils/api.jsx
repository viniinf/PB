import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakeapi.dev/api/v1',
});

export default api;