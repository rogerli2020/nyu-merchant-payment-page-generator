import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import SideBarButton from './SideBarButton';

export default function ButtonAppBar() {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [backgroundColorOpacity, setBackgroundColorOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change the opacity of the background color between 1 and 0.75 when scrolling from 100 to 150
      const opacity = Math.max(0.8, Math.min(1, 1 - (scrollPosition - 150) / 1500));
      setBackgroundColorOpacity(opacity);
      
      // Change the opacity of the text between 0 and 1 when scrolling from 100 to 150
      const textOpacity = Math.max(0, Math.min(1, (scrollPosition - 100) / 50));
      setScrollOpacity(textOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position='fixed' 
        style={{ backdropFilter: 'blur(16px)', backgroundColor: `rgba(87, 6, 140, ${backgroundColorOpacity})` }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SideBarButton />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, opacity: scrollOpacity, color: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ${scrollOpacity}))` }}>
            PAYMENT PAGE MAKER
          </Typography>
          <Button color="inherit" href="mailto:rel7817@nyu.edu">
            <EmailIcon style={{ marginRight: 5 }} />
            <p>Feature Request/Bug Report</p>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
