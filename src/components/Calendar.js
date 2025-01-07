import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid2, Box, Typography, Modal, TextField, Button } from '@mui/material';
import { getCalendarEntries, saveJournalEntry } from '../services/journalService';
import MoodBox from './MoodBox';
import moment from 'moment';
import { generateFullCalendar } from "../services/calendarService";
import { useTheme } from '@mui/material/styles';
import { useFocus } from '../providers/FocusProvider';

const Calendar = ({ }) => {
  const theme = useTheme();
  const { focusedRow } = useFocus();

  const [fullCalendar, setFullCalendar] = useState([]);
  const [weeksToLoad, setWeeksToLoad] = useState(15);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntry, setSavedEntry] = useState('');
  const [moodText, setMoodText] = useState('');
  const [moodColor, setMoodColor] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const rowOpacity = (rowIndex) => {
    if ([0, 1, 2].includes(Math.abs(focusedRow - rowIndex))) {
      return 1;
    } else {
      return 1 - (0.12 * Math.abs(focusedRow - rowIndex));
    }
  }

  const handleScroll = (e) => {
    // keeping empty
  };

  useEffect(() => {
    if (weeksToLoad - focusedRow < 8 && weeksToLoad < 40) {
      setWeeksToLoad((prev) => prev + 5);
    }
  }, [focusedRow]);

  useEffect(() => {
    const fetchCalendarEntries = async () => {
      const data = await getCalendarEntries();
      setCalendarData(data);
    };
    // fetchCalendarEntries();
  }, [calendarData]);

  useEffect(() => {
    const calendar = generateFullCalendar(calendarData, weeksToLoad);
    setFullCalendar(calendar);
  }, [calendarData, weeksToLoad]);

  const handleOpen = (date) => {
    setSelectedDate(date);
    const entry = calendarData.find(entry => entry.date === date);
    setJournalEntry(entry?.journalEntry || '');
    setMoodText(entry?.moodText || '');
    setMoodColor(entry?.moodColor || '');
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    if (journalEntry || !journalEntry.equals(savedEntry)) {
      await saveJournalEntry(selectedDate, journalEntry);
    }
    setSelectedDate(null);
  };

  const handleSaveEntry = async () => {
    setLoading(true);
    await saveJournalEntry(selectedDate, journalEntry);
    setLoading(false);
    setOpen(false);
    setSavedEntry(journalEntry);
    setCalendarData(prev => {
      const updated = [...prev];
      updated[selectedDate] = journalEntry;
      return updated;
    });
  };

  return (
    <>
      <Box sx={{ padding: 2 }} onScroll={handleScroll}>
        <Grid2 container spacing={1} sx={{ flexDirection: "column" }}>
          {fullCalendar.map((week, rowIndex) => (
            <Grid2 container key={rowIndex} spacing={1} sx={{ flex: 1 }} className="week-row">
              {week.map((day, colIndex) => (
                <Grid2
                  xs={1}
                  key={colIndex}
                  sx={{
                    opacity: rowOpacity(rowIndex),
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
                    today={moment().format("YYYY-MM-DD") === day.date}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ padding: '5px', color: theme.palette.primary.main }}>Journal</Typography>
            <Typography variant="h7" sx={{ padding: '5px', color: moodColor }}>{moodText ? `✨ Feeling ${moodText}` : ''}</Typography>
          </Box>
          <TextField
            label={selectedDate}
            multiline
            fullWidth
            rows={4}
            value={journalEntry}
            sx={{ marginTop: '10px' }}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          {loading ?
            (
              <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress sx={{ width: 20, height: 20 }} />
              </Box>
            ) : (
              <>
                <Button sx={{ padding: '10px 0 0 5px', justifyContent: 'left' }} onClick={handleSaveEntry}>Save</Button>
              </>
            )
          }
        </Box>
      </Modal>
    </>
  );
};

export default Calendar;
