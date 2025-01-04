// src/services/journalService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/journal'; // Replace with your backend URL

export const getCalendarEntries = async () => {
  try {
    const response = await axios.get(`${API_URL}/entries`);
    return response.data; // Assuming the response returns the calendar data
  } catch (error) {
    console.error('Error fetching calendar entries:', error);
    return [];
  }
};

export const saveJournalEntry = async (date, entry) => {
  try {
    const response = await axios.post(`${API_URL}/entry`, { date, entry });
    return response.data;
  } catch (error) {
    console.error('Error saving journal entry:', error);
  }
};
