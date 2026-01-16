import { Box, Typography } from '@mui/joy';
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: '#ffffff',
      }}
    >
      {/* Full-width header for About Us */}
      <Box id="about" sx={{ width: '100%', py: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto', px: 2 }}>
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#1e3a8a',
              mb: 3,
              lineHeight: 1.15,
            }}
          >
            Welcome To Executive Inn and Suites Baker
          </Typography>
          <Typography sx={{ fontSize: '15px', lineHeight: 1.8, color: '#555', mb: 2 }}>
            Nestled in the heart of Baker, Louisiana, our budget-friendly motel is the ideal choice for travelers seeking comfort and affordability. Located in a serene setting, our property offers easy access to major attractions.
          </Typography>
          <Typography sx={{ fontSize: '15px', lineHeight: 1.8, color: '#555' }}>
            Enjoy amenities such as free WiFi and free parking, with clean, comfortable rooms designed for a restful stay.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
