import axios from 'axios';

const HEALTH_API_URL = `${process.env.REACT_APP_API_URL}/health`;

export const getHealthCheck = async () => {
    return await axios.get(HEALTH_API_URL);
};
