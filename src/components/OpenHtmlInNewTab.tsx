import React from 'react';
import { Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const warningMessage = `
<div style="
  background-color: rgba(255, 255, 255, 0.65); 
  padding: 25px; 
  text-align: center; 
  position: fixed; 
  top: 0; 
  width: 100%; 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add box shadow */
">
    <h3>
      <strong>
        You're viewing a preview.
      </strong>
    </h3>
</div>
<br/><br/><br/><br/><br/><br/>
`

const OpenHtmlInNewTab: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  const handleOpenInNewTab = () => {
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = warningMessage + htmlContent;
    } else {
      console.error('Failed to open new tab. Make sure pop-ups are allowed in your browser settings.');
    }
  };

  return (
    <Button variant='contained' color='primary' sx={{ flexGrow: 1 }} onClick={handleOpenInNewTab}>
        <OpenInNewIcon fontSize='small' style={{marginRight: '5px'}}/>
        View in New Tab
    </Button>
  );
};

export default OpenHtmlInNewTab;
