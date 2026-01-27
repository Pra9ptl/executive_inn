import React from 'react';
import { Box, CssVarsProvider } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ background: '#ffffff', overflowX: 'hidden', pt: { xs: '72px', md: '76px' } }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookingPage />} />
          </Routes>
          <Footer />
        </Box>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
