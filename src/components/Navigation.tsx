import React, { useState } from 'react';
import { Box, Container, Button, Stack, Drawer, Divider, Typography } from '@mui/joy';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import logo from '../assets/Executive-Suites-Baker-Logo.png';
import BookingModal from './BookingModal';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Things To Do', href: '#things-to-do' },
  { label: 'Contact', href: '#contact' },
  { label: 'Book Now', href: '#booking' },
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavButtons = (onItemClick?: () => void) =>
    navItems.map((item) => {
      if (item.label === 'Book Now') {
        return (
          <BookingModal
            key={item.label}
            triggerText={item.label}
            variant="plain"
            sx={{
              px: 3,
              py: 1.5,
              fontSize: '14px',
              fontWeight: '600',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: 'all 0.3s ease',
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                transform: 'translateY(-1px)',
              },
            }}
          />
        );
      }

      return (
        <Button
          key={item.label}
          component="a"
          href={item.href}
          variant="plain"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);

            if (item.label === 'Home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const targetId = item.href.substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                const navHeight = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }

            onItemClick?.();
          }}
          sx={{
            color: '#666',
            fontWeight: '500',
            fontSize: '14px',
            px: 2,
            py: 0.8,
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            justifyContent: 'flex-start',
            '&:hover': {
              background: 'transparent',
              color: '#1e3a8a',
              fontWeight: '600',
            },
          }}
        >
          {item.label}
        </Button>
      );
    });

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, md: 2.5 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2.5 }}
        >
          {/* Logo/Brand */}
          <Box
            component="img"
            src={logo}
            alt="Executive Suites Baker Logo"
            sx={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': { opacity: 0.8 },
            }}
          />

          {/* Mobile Menu Icon */}
          <Box
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              cursor: 'pointer',
              color: '#1e3a8a',
              '&:hover': { opacity: 0.7 },
            }}
          >
            {mobileOpen ? <CloseIcon sx={{ fontSize: 24 }} /> : <MenuIcon sx={{ fontSize: 24 }} />}
          </Box>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row',
              width: 'auto',
              mt: 0,
              background: 'transparent',
              p: 0,
            }}
          >
            {renderNavButtons()}
          </Stack>
        </Stack>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          content: {
            sx: {
              width: { xs: '85vw', sm: 320 },
              maxWidth: 360,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(10px)',
            },
          },
        }}
      >
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          <Typography level="title-md" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
            Menu
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack spacing={0.5}>{renderNavButtons(() => setMobileOpen(false))}</Stack>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Navigation;
