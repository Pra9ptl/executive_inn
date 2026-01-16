import { ChevronLeft, ChevronRight, Hotel, Mail, Phone } from '@mui/icons-material';
import { Box, Container, IconButton, Stack, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import img1 from '../assets/executive-inn-baker-la.webp';
import img2 from '../assets/executive-inn-baker.webp';
import img3 from '../assets/exterior.webp';
import img4 from '../assets/lobby.webp';

const Header: React.FC = () => {
  const carouselImages = [img1, img2, img3, img4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: 'calc(100vh - 70px)',
        mb: 0,
      }}
    >
      {/* Carousel Background */}
      <Box
        key={currentImageIndex}
        component="img"
        src={carouselImages[currentImageIndex]}
        alt="Hotel carousel"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          animation: 'smoothSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          '@keyframes smoothSlideIn': {
            '0%': {
              opacity: 0,
              transform: 'translateX(50px)',
            },
            '50%': {
              opacity: 0.5,
            },
            '100%': {
              opacity: 1,
              transform: 'translateX(0px)',
            },
          },
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 1,
        }}
      />

      {/* Carousel Controls */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.35)',
          color: '#fbbf24',
          zIndex: 10,
          '&:hover': { background: 'rgba(0,0,0,0.55)' },
        }}
      >
        <ChevronLeft sx={{ fontSize: 28 }} />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.35)',
          color: '#fbbf24',
          zIndex: 10,
          '&:hover': { background: 'rgba(0,0,0,0.55)' },
        }}
      >
        <ChevronRight sx={{ fontSize: 28 }} />
      </IconButton>

      {/* Carousel Indicators */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        {carouselImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            sx={{
              width: currentImageIndex === index ? 32 : 8,
              height: 8,
              borderRadius: '4px',
              background: currentImageIndex === index ? '#fbbf24' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: currentImageIndex === index ? '#fbbf24' : 'rgba(255, 255, 255, 0.8)',
              },
            }}
          />
        ))}
      </Stack>

      {/* Content Overlay */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ maxWidth: '780px' }}>
          <Stack spacing={4}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', p: 1.5 }}>
                <Hotel sx={{ fontSize: 44, color: '#fbbf24' }} />
              </Box>
              <Box>
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: '32px', md: '48px' },
                    fontWeight: '800',
                    mb: 0.3,
                    color: 'white',
                  }}
                >
                  Executive Inn
                </Typography>
                <Typography level="body-sm" sx={{ fontSize: '16px', fontWeight: '600', color: '#fbbf24' }}>
                  & Suites Baker
                </Typography>
              </Box>
            </Stack>
            
            <Typography 
              level="body-lg" 
              sx={{ 
                fontSize: '18px', 
                maxWidth: '650px', 
                lineHeight: 1.7,
                color: 'white',
                fontWeight: '500',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Experience comfort and elegance in the heart of Baker, Louisiana. Premium accommodations with exceptional service and warm hospitality.
            </Typography>
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 2 }}>
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2.5}
                sx={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  p: 2.5,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Phone sx={{ fontSize: 28, color: '#fbbf24', flexShrink: 0 }} />
                <Box>
                  <Typography 
                    level="body-sm" 
                    sx={{ 
                      opacity: 0.85, 
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'white',
                    }}
                  >
                    Call us
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontWeight: '700', 
                      fontSize: '17px',
                      color: 'white',
                      letterSpacing: '0.3px',
                    }}
                  >
                    +1 (225) 771-1123
                  </Typography>
                </Box>
              </Stack>
              
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2.5}
                sx={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  p: 2.5,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Mail sx={{ fontSize: 28, color: '#fbbf24', flexShrink: 0 }} />
                <Box>
                  <Typography 
                    level="body-sm" 
                    sx={{ 
                      opacity: 0.85, 
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'white',
                    }}
                  >
                    Visit us
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontWeight: '700', 
                      fontSize: '17px',
                      color: 'white',
                      letterSpacing: '0.3px',
                    }}
                  >
                    430 Main St, Baker, LA 70714
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
