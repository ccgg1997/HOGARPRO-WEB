import axios from 'axios';

export const login = async (data) => {
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    try {
        const response = await axios.post(API_URL + '/app/login', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response;
    }
};

export const register = async (data) => {
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    try {
        const response = await axios.post(API_URL + '/app/register', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response;
    }
}