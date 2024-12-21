
import axios from 'axios';
import Cookies from 'js-cookie';
import { Backend_base } from '../Utils/Constance';

const BaseAxios = axios.create({
        baseURL: Backend_base, // Replace with your actual base URL
        timeout: 10000, // Optional: set a timeout for requests
    });
    
    // Step 2: Function to refresh the access token
    const refreshToken = async (role) => {
        console.log(role)
        try {
        // Get the refresh token from cookies 
        let rawToken=null
        if(role==='admin'){
            rawToken = Cookies.get("adminToken");
        }else{
           rawToken = Cookies.get("userToken");

        }
        if (!rawToken) {
            throw new Error('No token available');
        }
    
        const token = JSON.parse(rawToken);
        if (!token.refresh) {
            throw new Error('No refresh token available');
        }
        // Request a new access token using the refresh token
        const response = await axios.post(`${Backend_base}token/refresh/`, {
            refresh: token.refresh
        });
    
        const newToken = response.data;
            if(role==='admin'){
                Cookies.set("adminToken", JSON.stringify(newToken), { expires: 7 });

            }else{

                Cookies.set("userToken", JSON.stringify(newToken), { expires: 7 });

            }
    
        return newToken.access; // Return the new access token
        } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
        }
    };
    
    // Step 3: Axios request interceptor
    BaseAxios.interceptors.request.use(
        (config) => {
        const role = config.meta ? config.meta.role : null;
        let rawToken=null
        if(role==='admin'){
            rawToken = Cookies.get("adminToken");
        }else{
          rawToken = Cookies.get("userToken");

        }
        if (rawToken) {
            const token = JSON.parse(rawToken);
            config.headers['Authorization'] = `Bearer ${token.access}`;
        }
        return config;
        },
        (error) => Promise.reject(error)
    );
    
    // Step 3: Axios response interceptor for handling token refresh
    BaseAxios.interceptors.response.use(
        (response) => response,
        
        async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {

            const role = originalRequest.meta ? originalRequest.meta.role : null;
            const newAccessToken = await refreshToken(role);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return BaseAxios(originalRequest);
            } catch (err) {
            return Promise.reject(err);
            }
        }
        return Promise.reject(error);
        }
    );

export default BaseAxios;