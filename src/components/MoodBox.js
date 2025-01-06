import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MoodBox = ({ moodColor, onClick }) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                width: 50,
                height: 50,
                backgroundColor: moodColor,// || theme.palette.background.light,
                border: `1px solid ${theme.palette.secondary.main}`,
                cursor: 'pointer',
            }}
        />
    );
};

export default MoodBox;
