import { 
    Stack, 
    Paper,
    Divider,
    Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

const PreviewPage = () => {
  const previewHtml = useSelector((state: any) => state.preview);

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
