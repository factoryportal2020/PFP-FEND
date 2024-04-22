import axios from "axios";
import store from '../app/store.js'

let baseURL = (process.env.REACT_APP_API_URL)

const api = axios.create({
    baseURL: baseURL, // our API base URL
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken'); // Assuming you store the token in localStorage
        const adminEncryptId = localStorage.getItem('adminToken'); // Assuming you store the token in localStorage
        const role = "website" // Assuming you store the token in localStorage
        // if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.AccessControlAllowOrigin = baseURL;
            config.headers['Content-Type'] = "multipart/form-data";
            config.headers['Admin-EncryptId'] = adminEncryptId;
            config.headers['role'] = role;
            config.baseURL = `${baseURL}/${role}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Export the api instance
export default api;


