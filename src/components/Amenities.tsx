import {
  Accessible,
  AccessTime,
  LocalLaundryService,
  LocalParking,
  Pets,
  Wifi,
} from '@mui/icons-material';
import { Box, Card, Container, Grid, Typography } from '@mui/joy';
import React from 'react';

interface Amenity {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  {
    id: 0,
    icon: <Accessible sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: 'Accessible Room',
    description: 'Accessible guest rooms with mobility features',
  },
  {
    id: 1,
    icon: <LocalParking sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: 'Free Parking',
    description: 'Spacious parking lot available for all guests',
  },
  {
    id: 2,
    icon: <Wifi sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: 'Free WiFi',
    description: 'High-speed internet throughout the hotel',
  },
  {
    id: 3,
    icon: <Pets sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: 'Pet Friendly',
    description: 'Pets are allowed - $15.00 per pet per night',
  },
  {
    id: 4,
    icon: <AccessTime sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: '24-Hour Front Desk',
    description: 'Round-the-clock service for all your needs',
  },
  {
    id: 5,
    icon: <LocalLaundryService sx={{ fontSize: 48, color: '#fbbf24' }} />,
    title: 'Laundry Service',
    description: 'Self-serve laundry and laundry service available',
  },
];

const Amenities: React.FC = () => {
  return (
    <Box id="amenities" component="section" aria-labelledby="amenities-heading" sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
          <Typography
            id="amenities-heading"
            level="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '32px', md: '48px' },
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Hotel Amenities
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              color: '#475569',
              maxWidth: '800px',
              fontSize: { xs: '15px', md: '16px' },
              lineHeight: 1.8,
              px: 2,
              mb: 2,
            }}
          >
            We provide comprehensive amenities to ensure your stay is comfortable, convenient, and memorable.
          </Typography>
          <Typography
            level="body-md"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              maxWidth: '1000px',
              fontSize: { xs: '14px', md: '15px' },
              lineHeight: 1.8,
              px: { xs: 2, md: 4 },
            }}
          >
            At our Motel in Baker, Louisiana, we provide a range of amenities designed to make your stay comfortable and convenient, whether you're here for business or leisure. Located close to Downtown Baton Rouge, our motel offers easy access to city attractions and local destinations, making it a perfect choice among Downtown Baton Rouge hotels. Enjoy complimentary Wi-Fi throughout the property, allowing you to stay connected with ease. Our free on-site parking and 24-hour front desk service ensure your needs are met at any time, day or night. Each room features amenities like air conditioning, a flat-screen TV, and a microwave, all designed to enhance your experience and provide the comfort you need. At our Baker location, we aim to provide everything you need for a pleasant stay, keeping you close to the excitement of Downtown Baton Rouge while offering a quiet retreat at an affordable price. We look forward to hosting you and providing a memorable stay with the comfort and convenience you deserve.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.75, md: 2.5 }} sx={{ justifyContent: 'center' }}>
          {amenities.map((amenity) => (
            <Grid key={amenity.id} xs={6} sm={4} md={3} lg={2}>
              <Card
                className="amenities-card"
                role="article"
                aria-labelledby={`amenity-title-${amenity.id}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: { xs: 1.75, md: 2.5 },
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                    borderRadius: '16px 16px 0 0',
                  },
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    '& .amenity-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    },
                  },
                }}
              >
                {/* Icon Container with enhanced styling */}
                <Box
                  className="amenity-icon"
                  sx={{
                    mb: 2,
                    p: 2,
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { xs: '60px', md: '70px' },
                    height: { xs: '60px', md: '70px' },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.15)',
                    border: '2px solid rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {amenity.icon}
                </Box>

                <Typography
                  id={`amenity-title-${amenity.id}`}
                  level="title-md"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: { xs: '16px', md: '17px' },
                    letterSpacing: '-0.01em',
                  }}
                >
                  {amenity.title}
                </Typography>

                <Typography 
                  level="body-sm" 
                  sx={{ 
                    color: '#64748b', 
                    lineHeight: 1.6, 
                    fontSize: '14px',
                    px: 0.5,
                  }}
                >
                  {amenity.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Amenities;
