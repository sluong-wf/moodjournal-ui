import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MoodBox = ({ moodColor, onClick, today }) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                width: 50,
                height: 50,
                backgroundColor: moodColor,
                border: `1px solid ${!moodColor && today ? theme.palette.primary.main : theme.palette.secondary.main}`,
                cursor: 'pointer',
                "@media (max-width: 600px)": {
                    width: 42,
                    height: 42,
                },
            }}
        />
    );
};

export default MoodBox;
