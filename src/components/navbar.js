/** @jsxImportSource theme-ui */
import { Link, navigate } from 'gatsby';
import { Flex, NavLink, Box } from 'theme-ui';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../images/logo.png'; // Adjust path if needed

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
        as={Link}
        to={defaultTo}
        sx={{
          color: 'logo',
          textDecoration: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '2vmin',
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
              backgroundColor: 'primary',
              minWidth: '20vw',
              boxShadow: '0 1vmin 2vmin rgba(0,0,0,0.1)',
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
                  fontSize: '1.5vmin',
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
                    color: 'logo',
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
  color: 'logo',
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

const Navbar = () => {
  return (
    <Flex
      as="nav"
      sx={{
        width: '100%',
        backgroundColor: 'primary',
        alignItems: 'center',
        fontSize: '2vmin',
        padding: '2vmin',
      }}
    >
      {/* Left: Logo */}
      <Box sx={{ flex: '0 0 auto' }}>
        <NavLink as={Link} to="/" sx={{ color: 'logo', textDecoration: 'none', fontWeight: 'bold' }}>
          <img
            src={logo}
            alt="Logo"
            sx={{
              width: '12vmin',
              height: 'auto',
              borderRadius: '2vmin',
            }}
          />
        </NavLink>
      </Box>

      {/* Center: Nav Links and Dropdowns */}
      <Flex
        sx={{
          flex: '1 1 auto',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4vmin',
          flexWrap: 'wrap',
        }}
      >
        <NavLink as={Link} to="/" sx={navLinkStyles}>
          Home
        </NavLink>

        <Dropdown
          title="Competitions"
          defaultTo="/competitions"
          links={[
            { to: '/competitions', label: 'By State' },
            { to: '/competitions?view=schedule', label: 'Schedule' },
          ]}
        />

        <NavLink as={Link} to="/register" sx={navLinkStyles}>
          Membership & Registration
        </NavLink>

        <NavLink as={Link} to="/divisions" sx={navLinkStyles}>
          Divisions
        </NavLink>

        <NavLink as={Link} to="/rules_and_regulations" sx={navLinkStyles}>
          Rules
        </NavLink>

        <NavLink as={Link} to="/contact" sx={navLinkStyles}>
          Contact us
        </NavLink>

        <NavLink as={Link} to="/about" sx={navLinkStyles}>
          About us
        </NavLink>
      </Flex>

      {/* Right: Optional placeholder for balance (or additional icons) */}
      <Box sx={{ flex: '0 0 auto' }} />
    </Flex>
  );
};

export default Navbar;
