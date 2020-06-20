import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:3333/api" });
//const api = axios.create({ baseURL: "https://rockeatseat-node.herokuapp.com/api" });
export default api;