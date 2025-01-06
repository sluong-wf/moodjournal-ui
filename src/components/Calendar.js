import React, { useState, useEffect } from 'react';
import { Grid2, Box, Typography, Modal, TextField, Button } from '@mui/material';
import { getCalendarEntries, saveJournalEntry } from '../services/journalService';
import MoodBox from './MoodBox';
import moment from 'moment';
import { generateFullCalendar } from "../services/calendarService";
import { useTheme } from '@mui/material/styles';

const Calendar = ({ }) => {
  const theme = useTheme();

  const [fullCalendar, setFullCalendar] = useState([]);
  const [weeksToLoad, setWeeksToLoad] = useState(10); // Start with 10 weeks of data
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [calendarData, setCalendarData] = useState([]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      setWeeksToLoad((prev) => prev + 5); // Load 5 more weeks as you scroll
    }
  };

  useEffect(() => {
    const fetchCalendarEntries = async () => {
      const data = await getCalendarEntries();
      setCalendarData(data);
    };
    fetchCalendarEntries();
  }, []);

  useEffect(() => {
    const calendar = generateFullCalendar(calendarData, weeksToLoad);
    setFullCalendar(calendar);
  }, [calendarData, weeksToLoad]);

  const getHighlightStyle = (date) => {
    const todayDate = moment().format("YYYY-MM-DD");
    return date === todayDate ? { backgroundColor: "#ffd700", fontWeight: "bold" } : {};
  };

  const handleOpen = (date) => {
    setSelectedDate(date);
    setJournalEntry(calendarData[date] || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const handleSaveEntry = async () => {
    await saveJournalEntry(selectedDate, journalEntry);
    setOpen(false);
    setCalendarData(prev => {
      const updated = [...prev];
      updated[selectedDate] = journalEntry;
      return updated;
    });
  };

  return (
    <>
      <Box sx={{ padding: 2, height: "100vh", overflowY: "scroll" }} onScroll={handleScroll}>
        <Grid2 container spacing={1} sx={{ flexDirection: "column" }}>
          {fullCalendar.map((week, rowIndex) => (
            <Grid2 container key={rowIndex} spacing={1} sx={{ flex: 1 }}>
              {week.map((day, colIndex) => (
                <Grid2
                  xs={1}
                  key={colIndex}
                  sx={{
                    ...getHighlightStyle(day.date),
                    opacity: rowIndex === 0 ? 1 : 0.6,
                    transition: "opacity 0.3s",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MoodBox
                    moodColor={day.moodColor}
                    onClick={() => handleOpen(day.date)}
                  />
                </Grid2>
              ))}
            </Grid2>
          ))}
        </Grid2>
      </Box>
      {/* Modal for adding/updating journal entries */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6">Journal Entry for {selectedDate}</Typography>
          <TextField
            label="Journal Entry"
            multiline
            fullWidth
            rows={4}
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          <Button onClick={handleSaveEntry}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Calendar;
