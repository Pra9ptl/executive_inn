import React, { useState } from 'react';
import { Box, Container, Button, Stack } from '@mui/joy';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
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
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        background: 'white',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <Container maxWidth="lg">
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

          {/* Nav Items */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: { xs: mobileOpen ? 'flex' : 'none', md: 'flex' },
              flexDirection: { xs: 'column', md: 'row' },
              width: { xs: '100%', md: 'auto' },
              mt: { xs: 2, md: 0 },
              background: { xs: mobileOpen ? 'white' : 'transparent', md: 'transparent' },
              p: { xs: mobileOpen ? '16px 0' : 0, md: 0 },
              borderRadius: { xs: mobileOpen ? '0' : 0, md: 0 },
            }}
          >
            {navItems.map((item) => (
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
                        behavior: 'smooth'
                      });
                    }
                  }
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
                  '&:hover': {
                    background: 'transparent',
                    color: '#1e3a8a',
                    fontWeight: '600',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navigation;
