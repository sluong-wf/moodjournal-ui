import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/account';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        const { access_token } = response.data;

        localStorage.setItem('authToken', access_token);
        return access_token;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { access_token } = response.data;

        localStorage.setItem('authToken', access_token);
        return access_token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const isLoggedIn = () => {
    return getToken() !== null;
};

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const removeExpiredToken = () => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('authToken');
    }
};

export const getLoggedInUser = () => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
        return jwtDecode(token);
    } else {
        removeExpiredToken();
        removeUsername();
        return null;
    }
};

export const saveUsername = (username) => {
    localStorage.setItem('username', username);
};
export const getUsername = () => {
    return localStorage.getItem('username');
};
export const removeUsername = () => {
    localStorage.removeItem('username');
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No token found");
    }
    try {
        if (isTokenExpired(token)) {
            throw new Error("Token expired");
        }
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    } catch (error) {
        console.error("Invalid or expired token:", error);
        logoutUser();
        throw error;
    }
};
