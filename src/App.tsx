import React from 'react';
import { Box, CssVarsProvider } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PhotoGallery from './components/PhotoGallery';
import Amenities from './components/Amenities';
import ThingsToDo from './components/ThingsToDo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ background: '#ffffff', overflowX: 'hidden' }}>
        <Navigation />
        <Header />
        <AboutUs />
        <PhotoGallery />
        <Amenities />
        <ThingsToDo />
        <Contact />
        <Footer />
      </Box>
    </CssVarsProvider>
  );
}

export default App;
