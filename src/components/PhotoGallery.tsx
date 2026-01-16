import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Modal,
  ModalClose,
  Stack,
  Typography
} from '@mui/joy';
import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Exterior View',
    category: 'Exterior',
    image: require('../assets/exterior.webp'),
  },
  {
    id: 2,
    title: 'Modern Lobby',
    category: 'Lobby',
    image: require('../assets/lobby.webp'),
  },
  {
    id: 3,
    title: 'Comfortable Double Room',
    category: 'Rooms',
    image: require('../assets/double-bed.webp'),
  },
  {
    id: 4,
    title: 'King Suite with View',
    category: 'Rooms',
    image: require('../assets/king-suite.webp'),
  },
  {
    id: 5,
    title: 'Front Desk',
    category: 'Service',
    image: require('../assets/front-desk.webp'),
  },
  {
    id: 6,
    title: 'Spacious Parking',
    category: 'Facilities',
    image: require('../assets/parking.webp'),
  },
  {
    id: 7,
    title: 'Room Amenities',
    category: 'Amenities',
    image: require('../assets/room-amenities.webp'),
  },
  {
    id: 8,
    title: 'Bathroom',
    category: 'Amenities',
    image: require('../assets/bathroom.webp'),
  },
  {
    id: 9,
    title: 'King Bed Room',
    category: 'Rooms',
    image: require('../assets/king-bed.webp'),
  },
];

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))];
  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrevious = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
      const previousIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[previousIndex]);
    }
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  return (
    <Box id="gallery" sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 10 }}>
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '32px', md: '48px' },
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Photo Gallery
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              color: '#475569',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '16px',
              lineHeight: 1.7,
            }}
          >
            Explore the charm and comfort of our hotel through our carefully curated collection of photos showcasing our rooms, amenities, and warm hospitality.
          </Typography>
        </Stack>

        {/* Category Filter */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            mb: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              variant={selectedCategory === category ? 'solid' : 'outlined'}
              onClick={() => setSelectedCategory(category)}
              sx={{
                cursor: 'pointer',
                background:
                  selectedCategory === category
                    ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
                    : 'white',
                color: selectedCategory === category ? 'white' : '#1e3a8a',
                borderColor: '#3b82f6',
                borderWidth: selectedCategory === category ? 0 : 2,
                fontWeight: '600',
                fontSize: '13px',
                px: 2.5,
                py: 1.3,
                transition: 'all 0.25s ease',
                outline: 'none',
                '&:focus': {
                  outline: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: selectedCategory === category ? '0 10px 25px rgba(30, 58, 138, 0.3)' : '0 6px 16px rgba(30, 58, 138, 0.12)',
                },
              }}
            >
              {category}
            </Chip>
          ))}
        </Stack>

        {/* Gallery Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            mb: 4,
          }}
        >
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              onClick={() => setSelectedImage(image)}
              sx={{
                cursor: 'pointer',
                overflow: 'hidden',
                height: { xs: '280px', md: '340px' },
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                borderRadius: '12px',
                outline: 'none',
                '&:focus': {
                  outline: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-16px)',
                  boxShadow: '0 24px 48px rgba(30, 58, 138, 0.18)',
                  '& img': {
                    transform: 'scale(1.08)',
                  },
                },
              }}
            >
              <Box
                component="img"
                src={image.image}
                alt={image.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.5) 40%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  p: { xs: 2.5, md: 3 },
                  gap: 0.5,
                }}
              >
                <Typography 
                  level="title-lg" 
                  sx={{ 
                    fontWeight: '700', 
                    color: 'white',
                    fontSize: { xs: '16px', md: '18px' },
                    letterSpacing: '-0.3px',
                  }}
                >
                  {image.title}
                </Typography>
                <Typography 
                  level="body-sm" 
                  sx={{ 
                    color: '#fbbf24',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {image.category}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Modal for full-screen view */}
        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.95)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '90%' },
              maxWidth: '1200px',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {selectedImage && (
              <>
                {/* Top Bar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    px: { xs: 2, md: 0 },
                  }}
                >
                  <Box>
                    <Typography 
                      level="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: '700',
                        fontSize: { xs: '18px', md: '24px' },
                        mb: 0.5,
                      }}
                    >
                      {selectedImage.title}
                    </Typography>
                    <Typography 
                      level="body-sm" 
                      sx={{ 
                        color: '#94a3b8',
                        fontSize: { xs: '13px', md: '14px' },
                      }}
                    >
                      {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} of {filteredImages.length} • {selectedImage.category}
                    </Typography>
                  </Box>
                  
                  <ModalClose
                    variant="plain"
                    sx={{
                      position: 'static',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      borderRadius: '8px',
                      width: '40px',
                      height: '40px',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  />
                </Box>

                {/* Image Container */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '75vh',
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />

                  {/* Previous Button */}
                  <Button
                    onClick={handlePrevious}
                    variant="solid"
                    sx={{
                      position: 'absolute',
                      left: { xs: 8, md: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1e3a8a',
                      minWidth: { xs: '40px', md: '48px' },
                      minHeight: { xs: '40px', md: '48px' },
                      borderRadius: '8px',
                      padding: 0,
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        background: 'white',
                        transform: 'translateY(-50%) scale(1.05)',
                      },
                    }}
                  >
                    <ChevronLeft sx={{ fontSize: { xs: 24, md: 28 } }} />
                  </Button>

                  {/* Next Button */}
                  <Button
                    onClick={handleNext}
                    variant="solid"
                    sx={{
                      position: 'absolute',
                      right: { xs: 8, md: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1e3a8a',
                      minWidth: { xs: '40px', md: '48px' },
                      minHeight: { xs: '40px', md: '48px' },
                      borderRadius: '8px',
                      padding: 0,
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        background: 'white',
                        transform: 'translateY(-50%) scale(1.05)',
                      },
                    }}
                  >
                    <ChevronRight sx={{ fontSize: { xs: 24, md: 28 } }} />
                  </Button>
                </Box>

                {/* Thumbnail Strip */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: { xs: 1, md: 1.5 },
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    px: { xs: 2, md: 0 },
                    pb: { xs: 2, md: 3 },
                  }}
                >
                  {filteredImages.map((image) => (
                    <Box
                      key={image.id}
                      onClick={() => setSelectedImage(image)}
                      sx={{
                        width: { xs: '70px', sm: '80px', md: '90px' },
                        height: { xs: '50px', sm: '60px', md: '65px' },
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: selectedImage.id === image.id ? '3px solid white' : '3px solid transparent',
                        opacity: selectedImage.id === image.id ? 1 : 0.5,
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        '&:focus': {
                          outline: 'none',
                        },
                        '&:hover': {
                          opacity: 1,
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={image.image}
                        alt={image.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default PhotoGallery;
