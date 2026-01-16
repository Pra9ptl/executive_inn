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
    <Box id="gallery" sx={{ py: 10, background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 8 }}>
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '32px', md: '44px' },
              fontWeight: 'bold',
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
          spacing={2}
          sx={{
            mb: 8,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
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
                fontWeight: '600',
                fontSize: '14px',
                px: 2,
                py: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: selectedCategory === category ? '0 8px 20px rgba(30, 58, 138, 0.3)' : '0 4px 12px rgba(30, 58, 138, 0.15)',
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
            },
            gap: 4,
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
                height: '320px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 50px rgba(30, 58, 138, 0.25)',
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
                  transition: 'transform 0.4s ease',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  p: 3,
                }}
              >
                <Typography 
                  level="title-lg" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 0.5,
                    color: 'white',
                    fontSize: '18px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {image.title}
                </Typography>
                <Typography 
                  level="body-sm" 
                  sx={{ 
                    color: '#fbbf24',
                    fontSize: '14px',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
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
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '95%', md: '85%' },
              maxWidth: '900px',
              maxHeight: '90vh',
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            <ModalClose
              variant="plain"
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(0,0,0,0.8)',
                  transform: 'scale(1.1)',
                },
              }}
            />

            {selectedImage && (
              <>
                <Box
                  component="img"
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <Box sx={{ p: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
                  <Typography level="h3" sx={{ color: '#1e3a8a', mb: 1, fontWeight: 'bold' }}>
                    {selectedImage.title}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: '#64748b', mb: 3, fontSize: '14px' }}>
                    Category: {selectedImage.category}
                  </Typography>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      onClick={handlePrevious}
                      variant="solid"
                      sx={{
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                        color: 'white',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(30, 58, 138, 0.3)',
                        },
                      }}
                      startDecorator={<ChevronLeft />}
                    >
                      Previous
                    </Button>

                    <Typography level="body-sm" sx={{ alignSelf: 'center', color: '#64748b', fontWeight: '600' }}>
                      {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} of {filteredImages.length}
                    </Typography>

                    <Button
                      onClick={handleNext}
                      variant="solid"
                      sx={{
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                        color: 'white',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(30, 58, 138, 0.3)',
                        },
                      }}
                      endDecorator={<ChevronRight />}
                    >
                      Next
                    </Button>
                  </Stack>
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
