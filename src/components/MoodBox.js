import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MoodBox = ({ moodColor, dateString, onClick, today }) => {
    const theme = useTheme();
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();

    return (
        <Box
            onClick={onClick}
            sx={{
                width: 50,
                height: 50,
                backgroundColor: moodColor,
                position: 'relative',
                border: `1px solid ${!moodColor && today ? theme.palette.primary.main : theme.palette.secondary.main}`,
                cursor: 'pointer',
                fontFamily: 'monospace',
                "@media (max-width: 600px)": {
                    width: 42,
                    height: 42,
                },
            }}
        >
            {day === 1 &&
                <Typography variant="body1" sx={{ position: 'absolute', bottom: 2, right: 4, fontWeight: 'bold', fontSize: '12px', color: theme.palette.primary.main }}>
                    {month}
                </Typography>
            }
        </Box>
    );
};

export default MoodBox;
