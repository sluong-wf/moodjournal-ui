import React, { useState } from 'react';
import { Box, IconButton, Switch, FormControlLabel } from '@mui/material';
import { Brightness7, Brightness4, Nature, BeachAccess, ColorLens, BikeScooter, Settings, WbSunny } from '@mui/icons-material';
import PaletteIcon from "@mui/icons-material/Palette";
import { useTheme } from "@mui/material/styles";

const ThemeSelector = ({ switchTheme, toggleChatbot, isChatbotEnabled }) => {
  const theme = useTheme();

  const [collapsed, setCollapsed] = useState(true);

  const handleSelectTheme = (selectedTheme) => {
    switchTheme(selectedTheme);
  };

  return (
    <Box
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Box
        sx={{
          position: 'fixed',
          left: collapsed ? "-200px" : "0",
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: 2,
          borderRadius: '0 5px 5px 0',
          boxShadow: 3,
          zIndex: 1000,
          // transition: "left 0.3s ease-in-out",
        }}
      >
        <IconButton
          onClick={() => handleSelectTheme('light')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <Brightness7 />
        </IconButton>
        <IconButton
          onClick={() => handleSelectTheme('dark')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <Brightness4 />
        </IconButton>
        <IconButton
          onClick={() => handleSelectTheme('nature')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'secondary.light',
            },
          }}
        >
          <Nature />
        </IconButton>
        <IconButton
          onClick={() => handleSelectTheme('ocean')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
        >
          <BeachAccess />
        </IconButton>
        {/* <IconButton
          onClick={() => handleSelectTheme('sunset')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'accent.main',
            },
          }}
        >
          <WbSunny />
        </IconButton> */}
        <IconButton
          onClick={() => handleSelectTheme('pastel')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <ColorLens />
        </IconButton>
        <IconButton
          onClick={() => handleSelectTheme('futuristic')}
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <BikeScooter />
        </IconButton>
        <FormControlLabel sx={{ margin: '0' }} control={<Switch checked={isChatbotEnabled} onChange={toggleChatbot} color="primary" />} label="" />
      </Box>

      <IconButton
        sx={{
          position: "fixed",
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          zIndex: 1001,
          backgroundColor: "secondary.main",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: collapsed ? "block" : "none",
          boxShadow: 3,
        }}
      >
        <PaletteIcon />
      </IconButton>
    </Box>
  );
};

export default ThemeSelector;
