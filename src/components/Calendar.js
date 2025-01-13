import React, { useState, useEffect, use } from 'react';
import { CircularProgress, Grid2, Box, Typography, Modal, TextField, Button } from '@mui/material';
import { getCalendarEntries, postJournalEntry, requestChatPrompt } from '../services/journalService';
import MoodBox from './MoodBox';
import moment from 'moment';
import { generateFullCalendar } from "../services/calendarService";
import { useTheme } from '@mui/material/styles';
import { useFocus } from '../providers/FocusProvider';
import JournalHistory from './JournalHistory';
import { getLoggedInUser } from '../services/authService';

const Calendar = ({ usePrompt }) => {
  const messageRegex = /:(chat|u):([^:]+)(?=:|$)/gs;

  const theme = useTheme();
  const { focusedRow } = useFocus();

  const [fullCalendar, setFullCalendar] = useState([]);
  const [weeksToLoad, setWeeksToLoad] = useState(15);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalHistory, setJournalHistory] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');
  const [moodText, setMoodText] = useState('');
  const [moodColor, setMoodColor] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaveCheckOpen, setSaveCheckOpen] = useState(false);
  const [displayNewPrompt, setDisplayNewPrompt] = useState(true);
  const [isSaved, setIsSaved] = useState(true);

  // Helpers
  const parseHistory = (input) => {
    const matches = Array.from(input.matchAll(messageRegex));
    const messages = matches.map(([_, prefix, content]) => ({
      sender: prefix === 'u' ? 'user' : 'chatbot',
      text: content.trim(),
    }));
    return messages;
  };
  const journalHistoryList = parseHistory(journalHistory);

  const rowOpacity = (rowIndex) => {
    if ([0, 1, 2].includes(Math.abs(focusedRow - rowIndex))) {
      return 1;
    } else {
      return 1 - (0.12 * Math.abs(focusedRow - rowIndex));
    }
  };

  const handleScroll = (e) => {
    // keeping empty
  };

  const updateJournalState = (entry) => {
    setJournalHistory(entry?.journalEntry || '');
    setMoodText(entry?.moodText || '');
    setMoodColor(entry?.moodColor || '');
  };

  const resetToCalendarView = () => {
    setSaveCheckOpen(false);
    setOpen(false);
    setSelectedDate(null);
    setChatPrompt('');
    setJournalHistory('');
    setJournalEntry('');
  };

  useEffect(() => {
    if (weeksToLoad - focusedRow < 8 && weeksToLoad < 40) {
      setWeeksToLoad((prev) => prev + 5);
    }
  }, [focusedRow]);

  useEffect(() => {
    if (!getLoggedInUser()) { return; };
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

  const handleOpen = async (date) => {
    setSelectedDate(date);
    const entry = calendarData.find(entry => entry.date === date);
    updateJournalState(entry);
    setOpen(true);
    setChatPrompt(await requestChatPrompt(entry?.journalEntry || '', usePrompt));
  };

  const handleClose = async () => {
    setOpen(false);
    if (!isSaved || journalEntry) {
      setSaveCheckOpen(true);
    } else {
      resetToCalendarView();
    }
  };

  const handleSaveCheckClose = () => {
    resetToCalendarView();
    setIsSaved(true);
  };

  const handleSaveEntry = async () => {
    setDisplayNewPrompt(false);
    if (!isSaved) {
      setLoading(true);
      const updatedJournalHistory = journalEntry ? `${journalHistory}:chat:${chatPrompt}:u:${journalEntry}` : journalHistory;
      await postJournalEntry(selectedDate, updatedJournalHistory);
      setLoading(false);
      setIsSaved(true);
    }
    setCalendarData(await getCalendarEntries());
    setDisplayNewPrompt(true);
    resetToCalendarView();
  };

  const handleLogEntry = async () => {
    if (!journalEntry) {
      return;
    }
    setDisplayNewPrompt(false);
    const updatedJournalHistory = `${journalHistory}:chat:${chatPrompt}:u:${journalEntry}`;
    setJournalHistory(updatedJournalHistory);
    setJournalEntry('');
    setChatPrompt(await requestChatPrompt(updatedJournalHistory, usePrompt));
    setDisplayNewPrompt(true);
    setIsSaved(false);
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
                    dateString={day.date}
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
        <Box sx={{ width: 400, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '5%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ padding: '5px', color: theme.palette.primary.main }}>Journal</Typography>
            <Typography variant="h7" sx={{ padding: '5px', color: moodColor }}>{moodText ? `✨ Feeling ${moodText}` : ''}</Typography>
          </Box>
          <JournalHistory messages={journalHistoryList} prompt={chatPrompt} displayNewPrompt={usePrompt && displayNewPrompt} />
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
                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button sx={{ marginTop: '15px' }} variant="contained" color="primary" onClick={handleLogEntry}>
                    Log
                  </Button>
                  <Button sx={{ marginTop: '15px' }} variant="outlined" color="primary" onClick={handleSaveEntry}>
                    Save
                  </Button>
                </Box>
              </>
            )
          }
        </Box>
      </Modal>
      {/* Modal for unsaved changes */}
      <Modal open={isSaveCheckOpen} onClose={handleSaveCheckClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: 4,
            boxShadow: 24,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Unsaved Changes
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Do you want to save or discard your changes?
          </Typography>

          {loading ?
            (
              <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress sx={{ width: 20, height: 20 }} />
              </Box>
            ) :
            (
              <>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" color="primary" onClick={handleSaveEntry}>
                    Save
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleSaveCheckClose}>
                    Discard
                  </Button>
                </Box>
              </>
            )
          }
        </Box>
      </Modal>
    </>
  );
};

export default Calendar;
