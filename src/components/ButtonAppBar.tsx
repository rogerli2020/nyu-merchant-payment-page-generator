import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          
          <Button color="inherit" href="mailto:rel7817@nyu.edu">
            <EmailIcon style={{marginRight: 5}}/>
            <p>Feature Request/Bug Report</p>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}