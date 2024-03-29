// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57068c', // Change this to your desired primary color
    },
  },
  typography: {
    fontFamily: 'NYU Perstare, Arial, sans-serif',
  }
});

document.title = 'Payment Page Maker - NYU Merchants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
