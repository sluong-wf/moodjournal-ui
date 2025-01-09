import axios from 'axios';
import { getAuthHeaders } from './authService';
import axiosRetry from 'axios-retry';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/journal';

axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        console.log(`Retrying... (${retryCount})`);
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return error.code === 'ECONNABORTED' || error.response?.status >= 500;
    },
});

export const getCalendarEntries = async () => {
    try {
        const response = await axios.get(`${API_URL}/entries`,
            { headers: getAuthHeaders() }
        );
        return response.data.map(entry => {
            return {
                ...entry,
                moodColor: entry?.mood_color,
                moodText: entry?.mood_text,
                journalEntry: entry.journal_text,
                date: new Date(entry.entry_date).toISOString().split('T')[0],
            };
        });
    } catch (error) {
        console.error('Error fetching calendar entries:', error);
        return [];
    }
};

export const saveJournalEntry = async (date, entry) => {
    try {
        const response = await axios.put(`${API_URL}/entry/${date}`,
            { journal_text: entry },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving journal entry:', error);
    }
};
