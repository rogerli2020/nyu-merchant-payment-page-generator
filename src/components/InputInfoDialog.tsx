import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setInputFields } from '../redux/actions/inputActions';
import { toggleInputInfoDialog } from '../redux/actions/inputInfoDialogActions';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function InputInfoDialog() {
  const dispatch = useDispatch();
  const inputState = useSelector((state: any) => state.input);
  const inputStateString = JSON.stringify(inputState, null, 2);
  const open = useSelector((state: any) => state.inputInfoDialog);

  const handleClickOpen = () => {
    dispatch(toggleInputInfoDialog());
  };

  const handleClose = () => {
    dispatch(toggleInputInfoDialog());
  };

  const isValidJson = (jsonString: string) => {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        alert("Could not parse your input. Make sure it's in a correct JSON format.")
        return false;
    }
}

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ImportExportIcon fontSize='small' style={{marginRight: '5px'}}/>
        Import Input Data
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
            let newInputData = formJson.input_data;
            if (newInputData.length == 0) newInputData = '{}';
            if (isValidJson(newInputData))
            {
              dispatch(setInputFields(JSON.parse(newInputData)));
              handleClose();
            }
          },
        }}
        style={{
          "backdropFilter": "blur(10px)"
        }}
      >
        <DialogTitle>Import Input Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Copy and paste your own input data in the area below, or edit the current input data.</p>
            <p>An input data file, called <b>input_data.txt</b>, will be automatically generated for you whenever you generate a
            .zip file. You can simply copy and paste its content below if you intend to make modifications to it.</p>
            <p>Make sure your input is in JSON format.</p>
          </DialogContentText>
          <br/>
          <TextField 
            label="Input Data"
            defaultValue={inputStateString}
            variant="filled"
            multiline
            name="input_data"
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
