import axios from "axios";
import constants from '../redux/constants';
const { BASE_URL } = constants;
import reduxStore from "../redux/store";


// const BASE_URL = 'https://lauhub.onrender.com/api/v1';
// const BASE_URL = 'http://192.168.25.67:7000/api/v1/';


const client = axios.create({ baseURL: BASE_URL })


// Add a request interceptor to add the authentication token to every request
client.interceptors.request.use(
    function (config) {
        // Get the authentication token from your Redux store
        const token = reduxStore.getState().auth.token;

        // Add the token to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default client;