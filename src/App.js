import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { 
    HomeWrapper,
    Setup 
} from './components';
import { ErrorBoundary } from './ErrorBoundary';
import MuiErrorDialog from "./components/MuiErrorDialogue";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat"
  }
});


const App = () => {   

    const tryAgain = clearError => {
        clearError();
    };

    return (
        <React.StrictMode>
        
        <ThemeProvider theme={theme}>
            <ErrorBoundary
                fallback={clearError => (
                    <MuiErrorDialog
                    open={true}
                    callback={() => {
                        tryAgain(clearError);
                    }}
                    />
                )}
                > 
                <BrowserRouter>   
                <Routes>
                    <Route path="/" exact element={<HomeWrapper />} />
                    <Route path="/setup" element={<Setup />} />
                </Routes>
                </BrowserRouter>
            </ErrorBoundary>
            </ThemeProvider>
        
        </React.StrictMode>
    );
}

export default App