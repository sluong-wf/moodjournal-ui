import moment from "moment";

export const generateWeek = (startDate) => {
    const week = [];

    for (let i = 0; i < 7; i++) {
        const date = moment(startDate).subtract(i, "days").format("YYYY-MM-DD");
        week.push({
            date: date,
            moodColor: "", // Default color for now
            journalEntry: null, // Default entry (can be updated based on actual data)
        });
    }

    return week.reverse(); // Reversing to show the correct order from Sunday to Saturday
};

// Function to generate the full calendar for N weeks, starting from the current week
export const generateFullCalendar = (calendarData, numberOfWeeks) => {
    const fullCalendar = [];

    const startOfCurrentWeek = moment().startOf("week");

    // Generate weeks going back in time
    for (let i = 0; i < numberOfWeeks; i++) {
        const weekStartDate = startOfCurrentWeek.subtract(i, "weeks");
        const weekData = generateWeek(weekStartDate);

        // Check for data matching the week and populate it
        fullCalendar.push(
            weekData.map(day => {
                const dayData = calendarData.find(entry => entry.date === day.date);
                return dayData ? { ...day, moodColor: dayData.moodColor, journalEntry: dayData.journalEntry } : day;
            })
        );
    }

    return fullCalendar;
};
