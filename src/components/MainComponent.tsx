import ButtonAppBar from './ButtonAppBar';
import Box from '@mui/material/Box';
import PageForm from './PageForm';
import PreviewPage from './PreviewPage';
import { 
    Typography,
    Grid,
    Button,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

function MainComponent() {
  return (
    <div>
        <ButtonAppBar/>
            <Box sx={{
                margin:'100px',
                marginTop: '50px',
                }}>

                {/* Headline */}
                <Box>
                    <Typography variant="h3" fontWeight={'bold'}>PAYMENT PAGE GENERATOR</Typography>
                    <Typography>
                        This application generates payment page HTMLs for NYU Merchants using Touchnet UPay or NYU PGW.
                    </Typography>
                    <Button 
                        variant="outlined" 
                        style={{marginTop:'20px'}}
                        component="label"
                    >
                        <UploadIcon fontSize='small'/>
                        UPLOAD INPUT DATA
                        <input type="file" accept=".json, .txt" hidden/>
                    </Button>
                    <br/>
                    <br/>
                    <br/>
                </Box>

                <Grid container spacing={0.5}>
                    <Grid xs={4.5}>
                        <PageForm/>
                    </Grid>
                    <Grid xs>
                        <PreviewPage/>
                    </Grid>
                </Grid>


                {/* Footer */}
                <Box style={{
                    marginTop: '100px',
                    }}>
                    <Typography variant="h6">
                        NYU Payment Page Generator
                    </Typography>
                    <Typography variant="subtitle2">
                        GitHub Repo
                    </Typography>
                    <Typography variant="subtitle2">
                        {/* By <a href='https://www.rogerli.net/'>Roger Li</a> */}
                    </Typography>
                </Box>

            </Box>

    </div>
  );
}

export default MainComponent;
