import React from 'react';
import { 
    Button, 
    Stack, 
    Paper,
    Divider,
    Alert,
} from "@mui/material";

const PreviewPage = () => {
  const rawHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello World</title>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                text-align: center;
                margin: 20vh 0;
            }
            </style>
        </head>
        <body>
            <h2>
                The preview will show up here...
            </h2>
            <p>
                Fill out the store information, then click on the<br/>
                "Generate/Refresh Preview" button to generate a preview.
            </p>
        </body>
        </html>
    `;


  return (
    <Stack 
        spacing={1}   
        divider={<Divider orientation="vertical" flexItem />}
        height={'100%'}
        style={{marginTop:'25px'}}
    >
        <Alert severity="info">
            The preview below is only intended for confirming the correctness of the visuals and layout of the payment page. 
            To test payments, please generate, download, and upload the files to the TEST development server.
        </Alert>
        <Paper style={{height: '100%'}} elevation={24} variant='outlined'>
            <iframe
                title="Embedded TypeScript HTML"
                // srcDoc={rawHtml}
                src="./html_template/homepage.html"
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
