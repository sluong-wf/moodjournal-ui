import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MoodBox = ({ moodColor, dateString, onClick, today }) => {
    const theme = useTheme();
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const [boxOpacity, setBoxOpacity] = useState('80%');

    return (
        <Box
            onClick={onClick}
            onMouseEnter={() => setBoxOpacity('100%')}
            onMouseLeave={() => setBoxOpacity('80%')}
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
            {day === 1 ?
                <Typography variant="body1" sx={{ position: 'absolute', top: 5, left: 5, fontWeight: 'bold', fontSize: '12px', color: theme.palette.primary.main }}>
                    {month}
                </Typography> : <></>
            }
            <Typography variant="body1" sx={{ position: 'absolute', bottom: 5, right: 5, fontWeight: 'bold', fontSize: '10px', color: theme.palette.text.primary, opacity: boxOpacity }}>
                {day}
            </Typography>
        </Box>
    );
};

export default MoodBox;
