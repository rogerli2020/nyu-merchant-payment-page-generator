const initialState = `
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
  
  const previewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_PREVIEW_HTML':
        return action.payload;
      default:
        return state;
    }
    
  };
  
  export default previewReducer;
  