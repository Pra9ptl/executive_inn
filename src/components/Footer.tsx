import React from 'react';
import { Box, Container, Typography, Stack, Grid, Link, Divider } from '@mui/joy';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Things To Do', href: '#things-to-do' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(160deg, #0f1b2e 0%, #153b71 55%, #1d4d92 100%)',
        color: 'white',
        py: { xs: 6, md: 7 },
        mt: 0,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {/* Brand + Contact */}
          <Grid xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Typography
                level="title-md"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Executive Inn and Suites Baker
              </Typography>
              <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.92)', fontSize: '14px', lineHeight: 1.6 }}>
                Enjoy staying at Hotels in Baker, LA
              </Typography>
              <Stack spacing={1.1}>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                  430 Main St, Baker Louisiana 70714, US
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                  Phone: +1 (225) 771-1123
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                  Website: https://executivebakerla.com/
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Hotel Info */}
            <Grid xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Typography level="title-md" sx={{ fontWeight: 'bold', fontSize: '16px', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.3px' }}>
                Hotel Information
              </Typography>
              <Stack spacing={1.1}>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  <strong>Check-In:</strong> 3:00 PM
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  <strong>Check-Out:</strong> 11:00 AM
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  <strong>Children:</strong> of any age are welcome.
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  <strong>Rollaway/extra beds:</strong> are not available.
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  <strong>Pets:</strong> are allowed - $12.00 per pet per night
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Typography level="title-md" sx={{ fontWeight: 'bold', fontSize: '16px', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.3px' }}>
                Quick Links
              </Typography>
              <Stack spacing={0.8}>
                {quickLinks.map((l, i) => (
                  <Link
                    key={i}
                    href={l.href}
                    sx={{
                      color: 'rgba(255,255,255,0.88)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease, opacity 0.25s ease',
                      '&:hover': { color: '#fbbf24' },
                      '&:focus-visible': { outline: '2px solid #fbbf24', outlineOffset: '2px' },
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.10)' }} />

        <Stack spacing={3}>
          <Typography level="body-sm" sx={{ opacity: 1, fontSize: '12.5px', textAlign: 'center', fontWeight: "bold" }}>
            © {currentYear} Executive Inn and Suites Baker. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
