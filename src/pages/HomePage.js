import React, { useState } from 'react';
import NavbarComponent from '../components/Navbar';
import Calendar from '../components/Calendar';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeProvider } from '@mui/material/styles';
import { themes } from '../utils/theme'
import { getSelectedTheme } from '../utils/theme';


const calendarData = [
    { date: '2025-01-01', moodColor: '#ff0000', journalEntry: 'Feeling down today.' },
    { date: '2025-01-02', moodColor: '#00ff00', journalEntry: 'Had a great day!' },
    { date: '2025-01-03', moodColor: '#ffff00', journalEntry: 'Neutral day.' },
    // More entries...
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
        <ThemeProvider theme={themes[themeName]}>
            <div style={styles.container}>
                <ThemeSelector toggleTheme={toggleTheme} />
                <NavbarComponent />
                <div style={{ padding: '20px' }}>
                    {/* <h1>Welcome to Mood Journal</h1> */}
                    {/* <p>Track your mood and daily thoughts!</p> */}
                </div>
                <Calendar calendarData={calendarData} />
            </div>
        </ThemeProvider>
    );
}


export default HomePage;
