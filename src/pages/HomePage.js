import React, { useState } from 'react';
import NavbarComponent from '../components/Navbar';
import Calendar from '../components/Calendar';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeProvider } from '@mui/material/styles';
import { themes } from '../utils/theme'
import { getSelectedTheme } from '../utils/theme';
import { FocusProvider } from '../providers/FocusProvider';

const calendarData = [
    { date: "2025-01-02", moodColor: "#FFB6B6", journalEntry: "Enjoyed a peaceful walk in the park." },
    { date: "2024-12-20", moodColor: "#A4C3B2", journalEntry: "Had a productive day at work." },
    { date: "2024-11-27", moodColor: "#BFD7ED", journalEntry: "Spent quality time with family." },
    { date: "2024-12-25", moodColor: "#E5C1E5", journalEntry: "Read a great book, felt inspired." },
    { date: "2024-12-18", moodColor: "#F4D6A0", journalEntry: "Tried a new recipe, it was amazing!" },
    { date: "2024-12-21", moodColor: "#D9E4AA", journalEntry: "A bit tired, but grateful today." },
    { date: "2024-12-26", moodColor: "#FFC5A1", journalEntry: "Relaxed during the holiday." },
    { date: "2024-12-30", moodColor: "#C7D3E6", journalEntry: "Reflected on the year and set goals." },
];

const HomePage = () => {
    const [themeName, setThemeName] = useState(getSelectedTheme() ?? 'light');

    const toggleTheme = (newTheme) => {
        setThemeName(newTheme);
    };

    const styles = {
        container: {
            background: themes[themeName].palette.background.paper,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };
    return (
        <FocusProvider>
            <ThemeProvider theme={themes[themeName]}>
                <div style={styles.container}>
                    <ThemeSelector toggleTheme={toggleTheme} />
                    <NavbarComponent />
                    <div style={{ padding: '20px' }}>
                        {/* <h1>Welcome to Mood Journal</h1> */}
                        {/* <p>Track your mood and daily thoughts!</p> */}
                    </div>
                    <Calendar calData={calendarData} />
                </div>
            </ThemeProvider>
        </FocusProvider>
    );
}


export default HomePage;
