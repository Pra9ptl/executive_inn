import React from 'react';
import { Box, Container, Typography, Card, Grid, Stack } from '@mui/joy';
import { LocationOn, Museum, Park, School, Stadium, ShoppingBag } from '@mui/icons-material';

interface Attraction {
  id: number;
  name: string;
  icon: React.ReactNode;
  category: string;
}

const attractions: Attraction[] = [
  { id: 1, name: 'Baton Rouge Zoo', icon: <Park sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Family Fun' },
  { id: 2, name: 'LSU Louisiana State University', icon: <School sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Education & Sports' },
  { id: 3, name: 'Louisiana State Capitol', icon: <Museum sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'History & Culture' },
  { id: 4, name: 'USS Kidd Veterans Museum', icon: <Museum sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'History & Culture' },
  { id: 5, name: 'Burden Museum and Gardens', icon: <Park sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Nature & Parks' },
  { id: 6, name: 'Mall of Louisiana', icon: <ShoppingBag sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Shopping' },
  { id: 7, name: 'Copper Mill Golf Club', icon: <Stadium sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Recreation' },
  { id: 8, name: 'Baton Rouge Raceway', icon: <Stadium sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Entertainment' },
  { id: 9, name: 'Liberty Lagoon', icon: <Park sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Family Fun' },
  { id: 10, name: "Teddy's Juke Joint", icon: <LocationOn sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Entertainment' },
  { id: 11, name: 'Baker Range', icon: <Stadium sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Recreation' },
  { id: 12, name: "CoConut Willy's Zachary", icon: <LocationOn sx={{ fontSize: 28, color: '#fbbf24' }} />, category: 'Dining' },
];

const parks: string[] = [
  'Jefferson Park',
  'Anna Jordan Park',
  'Monte Sano Park',
  'Longfellow Park',
  'Tuscarrora Street Park',
  'Hooper Park',
  'Evangeline Park',
  'Madison Avenue Park',
  'Howell Park',
  'Lanier Drive Park',
  'Wenonah Street Park',
];

const ThingsToDo: React.FC = () => {
  return (
    <Box id="things-to-do" component="section" sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
          <Typography
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
            Area Attractions At Executive Inn and Suites Baker
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              color: '#475569',
              maxWidth: '900px',
              fontSize: { xs: '15px', md: '16px' },
              lineHeight: 1.8,
              px: 2,
              mb: 2,
            }}
          >
            Our convenient location at Baker Hotel places you close to a variety of exciting activities, including the renowned Baker Hotel near Baton Rouge Zoo and the LSU Louisiana State University Hotel. Perfect for families and visitors to the area, our hotel provides easy access to the zoo, where you can explore diverse wildlife and engaging exhibits that make for a memorable day out.
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
              mb: 2,
            }}
          >
            For those interested in education and sports, LSU is just a short drive away, making us an ideal LSU Louisiana State University hotel. Whether you're attending a game, exploring the campus, or visiting nearby cultural attractions, our location keeps you close to all the action. Discover the best of Baker and Baton Rouge from our hotel, where comfort and access to top attractions come together for a fantastic stay.
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
            Explore the exciting attractions near Executive Inn and Suites Baker! Just a short drive from our hotel, you can discover the rich culture and history of Baton Rouge, with landmarks like the Louisiana State Capitol and the Old Governor Mansion. For family fun, head to the Baton Rouge Zoo, where you'll find an array of fascinating wildlife. History enthusiasts will enjoy the USS Kidd Veterans Museum, a unique riverfront destination. The Burden Museum and Gardens offers beautiful landscapes perfect for leisurely strolls. Golfers can hit the greens at nearby Copper Mill Golf Club, while shoppers will love the Mall of Louisiana. Enjoy thrilling races at Baton Rouge Raceway or venture to Liberty Lagoon for water park excitement. Plus, we're close to Southern University for those visiting students or attending events. With so much to explore nearby, our hotel is the perfect base for an unforgettable stay.
          </Typography>
        </Box>

        {/* Featured Attractions */}
        <Typography
          level="h3"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 700,
            color: '#0f172a',
            mb: 4,
          }}
        >
          Featured Attractions
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Grid container spacing={{ xs: 1.25, md: 2 }}>
            {attractions.map((attraction) => (
              <Grid key={attraction.id} xs={12} sm={6} md={4} lg={3}>
                <Box
                  sx={{
                    position: 'relative',
                    p: 2.5,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '2px solid #e0f2fe',
                    borderRadius: 2,
                    transition: 'none',
                    cursor: 'default',
                  }}
                >
                  <Typography
                    level="title-sm"
                    sx={{
                      color: '#0f172a',
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '15px',
                      lineHeight: 1.4,
                    }}
                  >
                    {attraction.name}
                  </Typography>
                  <Box
                    className="category-badge"
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      background: '#e0f2fe',
                      color: '#1e40af',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography
                      level="body-xs"
                      sx={{
                        fontWeight: 600,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {attraction.category}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Local Parks */}
        <Card
          sx={{
            p: 4,
            background: 'white',
            border: 'none',
            boxShadow: '0 6px 18px rgba(2,6,23,0.06)',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Park sx={{ fontSize: 32, color: '#fbbf24' }} />
            </Box>
            <Typography
              level="h4"
              sx={{
                fontSize: { xs: '20px', md: '24px' },
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Local Parks & Recreation Areas
            </Typography>
          </Stack>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {parks.map((park, index) => (
              <Grid key={index} xs={12} sm={6} md={4}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    level="body-sm"
                    sx={{
                      color: '#475569',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {park}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ThingsToDo;
