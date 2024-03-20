import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviewHtml } from '../redux/actions/previewActions';
import { togglePreviewEditDialog } from '../redux/actions/previewEditDialogReducer';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar, VariantType } from "notistack";


export default function HomepageHTMLEditDialog() {
  const dispatch = useDispatch();
  const previewHtml: string = useSelector((state: any) => state.preview);
  const open = useSelector((state: any) => state.previewEditDialog);
  const { enqueueSnackbar } = useSnackbar();

  const addToSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  }

  const handleClickOpen = () => {
    dispatch(togglePreviewEditDialog());
  };

  const handleClose = () => {
    dispatch(togglePreviewEditDialog());
  };

  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' sx={{ flexGrow: 1 }} onClick={handleClickOpen}>
        <EditIcon fontSize='small' style={{marginRight: '5px'}}/>
        Edit Page HTML
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
            const homepageHTML = formJson.homepageHTML;
            dispatch(setPreviewHtml(homepageHTML));
            handleClose();
          },
        }}
        style={{
          "backdropFilter": "blur(10px)"
        }}
      >
        <DialogTitle>Update Page HTML</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Directly edit the page HTML here.
          </DialogContentText>
          <Button variant='outlined' style={{marginBottom: '10px', marginTop:'10px'}} disabled>
            IMPORT TEMPLATE (UNDER CONSTRUCTION)
          </Button>
          {/* <HtmlEditorComponent/> */}
          <TextField 
            label="Homepage HTML"
            defaultValue={previewHtml}
            variant="filled"
            multiline
            name="homepageHTML"
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
