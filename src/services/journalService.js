import axios from 'axios';
import { getAuthHeaders } from './authService';

const API_URL = 'http://127.0.0.1:5000/journal';

export const getCalendarEntries = async () => {
    try {
        const response = await axios.get(`${API_URL}/entries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching calendar entries:', error);
        return [];
    }
};

export const saveJournalEntry = async (date, entry) => {
    try {
        const response = await axios.post(
            `${API_URL}/entry/${date}`,
            { entry },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving journal entry:', error);
    }
};
