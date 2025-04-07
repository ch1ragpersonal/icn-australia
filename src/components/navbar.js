/** @jsxImportSource theme-ui */
import { Link, navigate } from 'gatsby';
import { Flex, NavLink, Box, Button } from 'theme-ui';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../images/logo.png';
import logo_hover from '../images/logo_hover.png';
import member_portal from '../images/member_portal.png';

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const Dropdown = ({ title, links, defaultTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        as="a"
        href={defaultTo}
        onClick={(e) => {
          if (window.location.pathname === defaultTo) return;
          e.preventDefault();
          navigate(defaultTo);
        }}
        sx={{
          color: '#004225',
          textDecoration: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '2.4vmin',
          position: 'relative',
          padding: '0.5rem 1rem',
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '2px',
            width: '0%',
            backgroundColor: 'secondary',
            transition: 'width 0.3s ease',
          },
          '&:hover:after, &:focus:after': {
            width: '100%',
          },
          '&:hover': {
            color: 'logo',
          },
        }}
      >
        {title}
      </NavLink>
      {isOpen && (
        <Portal>
          <Box
            sx={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              backgroundColor: '#fff',
              minWidth: '20vw',
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
              zIndex: 1000,
              borderRadius: '0 0 1vmin 1vmin',
            }}
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                as="button"
                onClick={() => {
                  navigate(to);
                  document.activeElement.blur();
                }}
                onBlur={(e) => e.target.blur()}
                sx={{
                  color: 'logo',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '1vmin 2vmin',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: '1.9vmin',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: '2px',
                    width: '0%',
                    backgroundColor: 'secondary',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover:after, &:focus:after': {
                    width: '100%',
                  },
                  '&:hover': {
                    color: 'buttonback',
                  },
                }}
              >
                {label}
              </NavLink>
            ))}
          </Box>
        </Portal>
      )}
    </Box>
  );
};

const navLinkStyles = {
  color: '#004225',
  textDecoration: 'none',
  fontWeight: 'bold',
  position: 'relative',
  padding: '0.5rem 1rem',
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '2px',
    width: '0%',
    backgroundColor: 'secondary',
    transition: 'width 0.3s ease',
  },
  '&:hover:after, &:focus:after': {
    width: '100%',
  },
  '&:hover': {
    color: 'logo',
  },
};

// Fullscreen mobile menu component
const MobileMenu = ({ onClose }) => {
  return (
    <Portal>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          zIndex: 2000,
          p: 4,
          overflowY: 'auto',
        }}
      >
        {/* Header with back arrow */}
        <Flex sx={{ alignItems: 'center', mb: 4 }}>
          <Button
            onClick={() => {
              navigate('/');
              onClose();
            }}
            sx={{
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#004225"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Button>
        </Flex>
        {/* Vertical nav links list */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/"
            onClick={(e) => {
              if (window.location.pathname === '/') return;
              e.preventDefault();
              navigate('/');
              onClose();
            }}
          >
            Home
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/competitions"
            onClick={(e) => {
              if (window.location.pathname === '/competitions') return;
              e.preventDefault();
              navigate('/competitions');
              onClose();
            }}
          >
            Competitions
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/register"
            onClick={(e) => {
              if (window.location.pathname === '/register') return;
              e.preventDefault();
              navigate('/register');
              onClose();
            }}
          >
            Membership & Registration
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/store"
            onClick={(e) => {
              if (window.location.pathname === '/store') return;
              e.preventDefault();
              navigate('/store');
              onClose();
            }}
          >
            Merchandise Store
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/divisions"
            onClick={(e) => {
              if (window.location.pathname === '/divisions') return;
              e.preventDefault();
              navigate('/divisions');
              onClose();
            }}
          >
            Divisions
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/rules"
            onClick={(e) => {
              if (window.location.pathname === '/rules') return;
              e.preventDefault();
              navigate('/rules');
              onClose();
            }}
          >
            Rules
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/contact"
            onClick={(e) => {
              if (window.location.pathname === '/contact') return;
              e.preventDefault();
              navigate('/contact');
              onClose();
            }}
          >
            Contact us
          </NavLink>
          <NavLink
            sx={navLinkStyles}
            as="a"
            href="/about"
            onClick={(e) => {
              if (window.location.pathname === '/about') return;
              e.preventDefault();
              navigate('/about');
              onClose();
            }}
          >
            About us
          </NavLink>
        </Box>
      </Box>
    </Portal>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Flex
        as="nav"
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          alignItems: 'center',
          borderBottom: '3px solid #004225',
          padding: '2vmin',
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: '1 0 auto', textAlign: 'left' }}>
          {/* Mobile: Hamburger icon */}
          <Box
            sx={{ display: ['block', 'none'], cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#004225"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Box>
          {/* Desktop: Logo on left */}
          <Box sx={{ display: ['none', 'block'] }}>
            <NavLink
              as={Link}
              to="/"
              sx={{
                color: 'logo',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
              }}
            >
              <img
                src={logo}
                alt="Logo"
                sx={{
                  width: '12vmin',
                  height: 'auto',
                  borderRadius: '2vmin',
                  filter: 'grayscale(100%) brightness(0%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter:
                      'invert(59%) sepia(99%) saturate(475%) hue-rotate(3deg) brightness(103%) contrast(101%)',
                  },
                }}
              />
            </NavLink>
          </Box>
        </Box>

        {/* Center Column */}
        <Box sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          {/* Mobile: Logo in center */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: ['block', 'none'],
            }}
          >
            <NavLink
              as={Link}
              to="/"
              sx={{
                color: 'logo',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
              }}
            >
              <img
                src={logo}
                alt="Logo"
                sx={{
                  width: '12vmin',
                  height: 'auto',
                  borderRadius: '2vmin',
                  filter: 'grayscale(100%) brightness(0%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter:
                      'invert(59%) sepia(99%) saturate(475%) hue-rotate(3deg) brightness(103%) contrast(101%)',
                  },
                }}
              />
            </NavLink>
          </Box>

          {/* Desktop: Nav Links in center */}
          <Flex
            sx={{
              display: ['none', 'flex'],
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4vmin',
            }}
          >
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') return;
                e.preventDefault();
                navigate('/');
              }}
            >
              Home
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/competitions"
              onClick={(e) => {
                if (window.location.pathname === '/competitions') return;
                e.preventDefault();
                navigate('/competitions');
              }}
            >
              Competitions
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/register"
              onClick={(e) => {
                if (window.location.pathname === '/register') return;
                e.preventDefault();
                navigate('/register');
              }}
            >
              Membership & Registration
            </NavLink>

            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/store"
              onClick={(e) => {
                if (window.location.pathname === '/store') return;
                e.preventDefault();
                navigate('/store');
              }}
            >
              Merchandise Store
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/divisions"
              onClick={(e) => {
                if (window.location.pathname === '/divisions') return;
                e.preventDefault();
                navigate('/divisions');
              }}
            >
              Divisions
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/rules"
              onClick={(e) => {
                if (window.location.pathname === '/rules') return;
                e.preventDefault();
                navigate('/rules');
              }}
            >
              Rules
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/contact"
              onClick={(e) => {
                if (window.location.pathname === '/contact') return;
                e.preventDefault();
                navigate('/contact');
              }}
            >
              Contact us
            </NavLink>
            <NavLink
              sx={navLinkStyles}
              as="a"
              href="/about"
              onClick={(e) => {
                if (window.location.pathname === '/about') return;
                e.preventDefault();
                navigate('/about');
              }}
            >
              About us
            </NavLink>
          </Flex>
        </Box>

        {/* Right Column: Member Portal */}
        <Box sx={{ flex: '1 0 auto', textAlign: 'right' }}>
          <a
            href="https://www.icompetenatural.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'logo',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            <img
              src={member_portal}
              alt="Member's Portal"
              sx={{
                width: '17vmin',
                height: 'auto',
                borderRadius: '2vmin',
                filter: 'grayscale(100%) brightness(0%)',
                transition: 'filter 0.3s ease',
                '&:hover': {
                  filter:
                    'invert(59%) sepia(99%) saturate(475%) hue-rotate(3deg) brightness(103%) contrast(101%)',
                },
              }}
            />
          </a>
        </Box>
      </Flex>
      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
