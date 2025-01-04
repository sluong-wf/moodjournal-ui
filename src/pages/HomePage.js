import React from 'react';
import NavbarComponent from '../components/Navbar';
import Calendar from '../components/Calendar';


const calendarData = [
    { date: '2025-01-01', moodColor: '#ff0000', journalEntry: 'Feeling down today.' },
    { date: '2025-01-02', moodColor: '#00ff00', journalEntry: 'Had a great day!' },
    { date: '2025-01-03', moodColor: '#ffff00', journalEntry: 'Neutral day.' },
    // More entries...
];


const HomePage = () => {
    const styles = {
        container: {
            background: "#8c9bbe",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };

    return (
        <div style={styles.container}>
            <NavbarComponent />
            <div style={{ padding: '20px' }}>
                <h1>Welcome to Mood Journal</h1>
                <p>Track your mood and daily thoughts!</p>
            </div>
            <Calendar calendarData={calendarData} />
        </div>
    );
}

export default HomePage;
