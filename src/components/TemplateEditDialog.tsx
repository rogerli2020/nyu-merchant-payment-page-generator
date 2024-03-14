import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../redux/actions/templateActions';

export default function TemplateEditDialog() {
  const dispatch = useDispatch();
  const templateState = useSelector((state: any) => state.template);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Template
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const templateHTML = formJson.templateHTML;
            dispatch(setTemplate(templateHTML));
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Template HTML</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy and paste your own template's HTML content here, or edit the existing HTML.
          </DialogContentText>
          <br/>
          <TextField 
            label="Template HTML"
            defaultValue={templateState}
            variant="filled"
            multiline
            name="templateHTML"
            minRows={50}
            maxRows={16384}
            fullWidth
            InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
