// src/components/MoodBox.js
import React from 'react';
import { Box } from '@mui/material';

const MoodBox = ({ moodColor, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 50,
        height: 50,
        backgroundColor: moodColor || '#fff',
        border: '1px solid #ddd',
        cursor: 'pointer',
      }}
    />
  );
};

export default MoodBox;
