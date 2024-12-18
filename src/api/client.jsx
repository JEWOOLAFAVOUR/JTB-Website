import axios from "axios";
import constants from '../redux/constants';
import useAuthStore from "../zustand/useAuthStore";

const { BASE_URL } = constants;

const client = axios.create({ baseURL: BASE_URL });

// Add a request interceptor to add the authentication token to every request
client.interceptors.request.use(
    function (config) {
        // Access Zustand's state using getState()
        const { token } = useAuthStore.getState();

        // console.log('..........', token)

        // Add the token to the request headers if available
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default client;
