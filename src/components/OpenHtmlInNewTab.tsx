import React from 'react';
import { Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const warningMessage = `
<div style="background-color: #f0f0f0; padding: 25px; text-align: center; position: fixed; top: 0; width: 100%;">
    <h3><strong>You're viewing a preview.</strong></h3>
</div><br/><br/><br/><br/><br/>
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
