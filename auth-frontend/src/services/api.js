// functions that talk to the backend API using axios
import axios from 'axios';
import { setAuthToken } from './axiosConfig';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend API URL

// for signup
export const signupUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {username, email, password});
        const token = response.data.token;
        if (token) setAuthToken(token); // set token in axios headers
    
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

// for login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {email, password});
        const token = response.data.token;
        if (token) setAuthToken(token); // set token in axios headers

        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};