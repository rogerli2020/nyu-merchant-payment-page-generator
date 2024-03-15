import ButtonAppBar from './ButtonAppBar';
import Box from '@mui/material/Box';
import PageForm from './PageForm';
import PreviewPage from './PreviewPage';
import { 
    Typography,
    Grid,
    Button,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function MainComponent() {
  return (
    <div>
        <ButtonAppBar/>
            <Box sx={{
                margin:'100px',
                marginTop: '50px',
                }}>

                {/* Headline */}
                <Box style={{marginTop: '125px'}}>
                    <Typography variant="h3" fontWeight={'bold'}>Payment Page Maker</Typography>
                    <Typography>
                        This application generates payment page HTMLs for NYU Merchants using Touchnet UPay or NYU PGW.
                    </Typography>
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
                <Grid 
                    container
                    spacing={0.5}
                    style={{marginTop: '100px'}}
                >
                    <Grid style={{ display: "flex", flexDirection: "column", gap: "10px", flex: '1', height:'100%' }}>
                        <Typography variant="h6">
                            NYU Payment Page Generator
                        </Typography>
                        <Typography variant="subtitle2" style={{ justifyContent: 'center' }}>
                        <a
                            href="https://github.com/rogerli2020/nyu-merchant-payment-page-generator"
                            style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: '200px',
                            }}
                        >
                            <GitHubIcon fontSize='small' style={{ marginRight: '4px' }} />
                            GitHub Repo
                        </a>
                        </Typography>
                        <Typography variant="subtitle2">
                            {/* By <a href='https://www.rogerli.net/'>Roger Li</a> */}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'flex-end', 
                                justifyContent: 'flex-end', 
                                height:'100%',
                                textAlign:'right',
                            }}
                            variant='subtitle1'
                        >
                            © 2024 NYU Payment Page Generator Project.
                        </Typography>
                    </Grid>

                </Grid>

            </Box>

    </div>
  );
}

export default MainComponent;
