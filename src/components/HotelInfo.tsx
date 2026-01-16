import React from 'react';
import { Box, Container, Typography, Card, Grid, Stack, List, ListItem } from '@mui/joy';
import { AccessTime, CheckCircle, Info } from '@mui/icons-material';

const HotelInfo: React.FC = () => {
  return (
    <Box sx={{ py: 10, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Card
              sx={{
                overflow: 'hidden',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={require('../assets/executive-inn-baker-la.webp')}
                alt="Executive Inn Baker"
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
              <Stack spacing={3} sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <AccessTime sx={{ color: '#fbbf24', fontSize: 28, mt: 0.5, flexShrink: 0 }} />
                  <Box>
                    <Typography
                      level="title-md"
                      sx={{ color: '#0f172a', fontWeight: 'bold', mb: 1 }}
                    >
                      Check-In & Check-Out
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#64748b', fontSize: '14px' }}>
                      <strong>Check-In:</strong> 3:00 PM
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#64748b', fontSize: '14px' }}>
                      <strong>Check-Out:</strong> 11:00 AM
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <CheckCircle sx={{ color: '#fbbf24', fontSize: 28, mt: 0.5, flexShrink: 0 }} />
                  <Box>
                    <Typography
                      level="title-md"
                      sx={{ color: '#0f172a', fontWeight: 'bold', mb: 1 }}
                    >
                      Children & Rollaway Beds
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#64748b', fontSize: '14px' }}>
                      Children of any age are welcome
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#64748b', fontSize: '14px' }}>
                      Rollaway/extra beds are not available
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Info sx={{ color: '#fbbf24', fontSize: 28, mt: 0.5, flexShrink: 0 }} />
                  <Box>
                    <Typography
                      level="title-md"
                      sx={{ color: '#0f172a', fontWeight: 'bold', mb: 1 }}
                    >
                      Pet Policy
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#64748b', fontSize: '14px' }}>
                      Pets are allowed - $12.00 per pet per night
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Card
                sx={{
                  p: 4,
                  background: 'white',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography
                  level="title-lg"
                  sx={{ color: '#0f172a', fontWeight: 'bold', mb: 2, fontSize: '20px' }}
                >
                  About Executive Inn and Suites
                </Typography>
                <Typography level="body-md" sx={{ color: '#64748b', mb: 3, lineHeight: 1.7, fontSize: '15px' }}>
                  Located in the heart of Baker, Louisiana, Executive Inn and Suites offers
                  comfortable, affordable accommodation perfect for business travelers and leisure
                  guests alike. Our convenient location near Louisiana State University and just
                  minutes from downtown Baton Rouge makes us an ideal choice for your stay.
                </Typography>
              </Card>

              <Card
                sx={{
                  p: 4,
                  background: 'white',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography
                  level="title-md"
                  sx={{ color: '#0f172a', fontWeight: 'bold', mb: 3, fontSize: '16px' }}
                >
                  Why Choose Us?
                </Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', mt: 1, flexShrink: 0 }} />
                    <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>Affordable luxury accommodations</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', mt: 1, flexShrink: 0 }} />
                    <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>Convenient location near attractions and universities</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', mt: 1, flexShrink: 0 }} />
                    <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>Friendly and attentive staff</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', mt: 1, flexShrink: 0 }} />
                    <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>Complimentary amenities and services</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', mt: 1, flexShrink: 0 }} />
                    <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>Clean and well-maintained facilities</Typography>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HotelInfo;
