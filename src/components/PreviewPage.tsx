import { 
    Stack, 
    Paper,
    Divider,
    Alert,
    Button,
    Box,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import OpenHtmlInNewTab from "./OpenHtmlInNewTab";
import { useSnackbar, VariantType } from "notistack";
import HomepageHTMLEditDialog from "./HomepageHTMLEditDialog";

const PreviewPage = () => {
  const previewHtml: string = useSelector((state: any) => state.preview);
  const { enqueueSnackbar } = useSnackbar();

  const addToSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  }


  // add message to snackbar whenever component refreshes.
  if (!previewHtml.includes('"Generate/Refresh Preview" button to generate a preview.'))
    addToSnackbar('Homepage HTML Updated!', 'success');

  return (
    <Stack 
        spacing={1}   
        divider={<Divider orientation="vertical" flexItem />}
        height={'100%'}
    >
        <Alert severity="info">
            The preview below is only intended for confirming the correctness of the visuals and layout of the payment page. 
            To test payments, please generate, download, and upload the files to the TEST development server.
        </Alert>

        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* <Button variant='outlined' color='primary' sx={{ flexGrow: 1 }} disabled>
                <EditIcon fontSize='small' style={{marginRight: '5px'}}/>
                Edit preview HTML (UNDER CONSTRUCTION)
            </Button> */}
            <HomepageHTMLEditDialog/>
            <OpenHtmlInNewTab htmlContent={previewHtml}/>
            
        </Box>

        <Paper style={{height: '100%'}} variant='outlined'>
            <iframe
                title="Embedded TypeScript HTML"
                srcDoc={previewHtml}
                style={{
                    width:"100%",
                    height:"100%",
                    border: 'none',
                }}
            />
        </Paper>
    </Stack>
  );
};

export default PreviewPage;
