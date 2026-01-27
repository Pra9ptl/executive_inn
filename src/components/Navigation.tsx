import React, { useState } from 'react';
import { Box, Container, Button, Stack, Drawer, Divider, Typography } from '@mui/joy';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Executive-Suites-Baker-Logo.png';

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
  { label: 'Book Now', href: '/book' },
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToId = (targetId: string) => {
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
  };

  const renderNavButtons = (onItemClick?: () => void) =>
    navItems.map((item) => {
      return (
        <Button
          key={item.label}
          component={item.label === 'Book Now' ? RouterLink : 'button'}
          to={item.label === 'Book Now' ? item.href : undefined}
          variant="plain"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (item.label === 'Book Now') {
              setMobileOpen(false);
              return;
            }

            e.preventDefault();
            const targetId = item.href.substring(1);
            setMobileOpen(false);

            if (location.pathname !== '/') {
              navigate('/', { state: { targetId } });
            } else {
              scrollToId(targetId);
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
            textDecoration: 'none',
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
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
