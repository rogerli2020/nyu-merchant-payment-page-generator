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
import { toggleTemplateDialog } from '../redux/actions/templateDialogActions';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar, VariantType } from "notistack";


export default function TemplateEditDialog() {
  const dispatch = useDispatch();
  const templateState = useSelector((state: any) => state.template);
  const open = useSelector((state: any) => state.templateDialog);
  const { enqueueSnackbar } = useSnackbar();

  const addToSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  }

  const basePath = process.env.PUBLIC_URL || '';
  const defaultTemplateURL = `${basePath}/html_template/homepage.html`;

  const handleClickOpen = () => {
    dispatch(toggleTemplateDialog());
  };

  const handleClose = () => {
    dispatch(toggleTemplateDialog());
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <EditIcon fontSize='small' style={{marginRight: '5px'}}/>
        Edit Template
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
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
            addToSnackbar('Template Updated!', 'success');
            handleClose();
          },
        }}
        style={{
          "backdropFilter": "blur(10px)"
        }}
      >
        <DialogTitle>Update Template HTML</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy and paste your own template's HTML here, or edit the HTML template below.<br/>
            You can get the default template <a href={defaultTemplateURL} target="_blank">here</a>.
            <p>Note: you're editing the template, <b><u>NOT</u></b> the HTML of the final payment page.</p>
          </DialogContentText>
          <Button variant='outlined' style={{marginBottom: '10px'}} disabled>
            IMPORT TEMPLATE (UNDER CONSTRUCTION)
          </Button>
          {/* <HtmlEditorComponent/> */}
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
