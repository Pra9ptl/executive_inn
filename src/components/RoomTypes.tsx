import { Groups } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  Container,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface RoomType {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
  features: string[];
}

const roomTypes: RoomType[] = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'Comfortable room with all the essentials for a pleasant stay',
    image: require('../assets/double-bed.webp'),
    capacity: 2,
    features: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Private Bathroom'],
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description: 'Spacious room with premium amenities and modern decor',
    image: require('../assets/king-suite.webp'),
    capacity: 3,
    features: ['Free WiFi', 'Air Conditioning', 'Work Desk', 'Microwave & Fridge'],
  },
  {
    id: 3,
    name: 'Suite',
    description: 'Luxury suite with separate living area and premium furnishings',
    image: require('../assets/king-bed.webp'),
    capacity: 4,
    features: ['Free WiFi', 'Living Area', 'Kitchenette', 'Luxury Bedding'],
  },
];

const RoomTypes: React.FC = () => {
  return (
    <Box id="rooms" sx={{ py: 10, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '32px', md: '44px' },
              fontWeight: 'bold',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Our Room Types
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              color: '#475569',
              maxWidth: '700px',
              fontSize: '16px',
              lineHeight: 1.7,
              px: 2,
            }}
          >
            Choose from a variety of comfortable and well-appointed rooms tailored to meet your needs. Each room is designed with your comfort in mind.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {roomTypes.map((room) => (
            <Card
              key={room.id}
              sx={{
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 50px rgba(30, 58, 138, 0.25)',
                },
              }}
            >
              <CardCover sx={{ height: '280px', position: 'relative' }}>
                <Box
                  component="img"
                  src={room.image}
                  alt={room.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                {/* Overlay badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: '24px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                  }}
                >
                  Up to {room.capacity} guests
                </Box>
              </CardCover>

              <CardContent sx={{ background: 'white', pb: 3 }}>
                <Typography
                  level="title-lg"
                  sx={{
                    color: '#0f172a',
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: '20px',
                  }}
                >
                  {room.name}
                </Typography>

                <Typography level="body-sm" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6 }}>
                  {room.description}
                </Typography>

                <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #e2e8f0' }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Groups sx={{ fontSize: 20, color: '#fbbf24' }} />
                    <Typography level="body-sm" sx={{ fontWeight: '600', color: '#1e3a8a' }}>
                      {room.capacity} Guest{room.capacity > 1 ? 's' : ''}
                    </Typography>
                  </Stack>
                </Box>

                <Typography level="body-sm" sx={{ fontWeight: '600', color: '#1e3a8a', mb: 2 }}>
                  Amenities:
                </Typography>

                <List sx={{ mb: 4 }}>
                  {room.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.75 }}>
                      <ListItemDecorator>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          }}
                        />
                      </ListItemDecorator>
                      <Typography level="body-sm" sx={{ color: '#475569', fontSize: '14px' }}>
                        {feature}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Button
                  component={RouterLink}
                  to="/book"
                  variant="solid"
                  sx={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '15px',
                    py: 1.5,
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(30, 58, 138, 0.3)',
                    },
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomTypes;
