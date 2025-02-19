/** @jsxImportSource theme-ui */
import { Link, navigate } from 'gatsby';
import { Flex, NavLink, Box } from 'theme-ui';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../images/logo.png'; // Adjust path if needed
import member_portal from '../images/member_portal.png'

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
      sx={{ position: 'relative'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        as="a" // Use regular anchor tag
        href={defaultTo} // Use href for full reload
        onClick={(e) => {
          if (window.location.pathname === defaultTo) {
             return; // Let the browser handle the full reload
          }
          e.preventDefault(); // Prevent default for other links
          navigate(defaultTo); // Use Gatsby's navigate for other pages
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
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
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

const Navbar = () => {
  return (
    <Flex
      as="nav"
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottom: '3px solid #004225',
        fontSize: '2.4vmin',
        padding: '2vmin',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
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
        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/'); // Use Gatsby's navigate
                }}
          >
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

        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/register" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/register') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/register'); // Use Gatsby's navigate
                }}
          >
          Membership & Registration
        </NavLink>

        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/divisions" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/divisions') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/divisions'); // Use Gatsby's navigate
                }}
          >          
          Divisions
        </NavLink>

        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/rules" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/rules') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/rules'); // Use Gatsby's navigate
                }}
          >          
          Rules
        </NavLink>

        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/contact" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/contact') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/contact'); // Use Gatsby's navigate
                }}
          >          
          Contact us
        </NavLink>

        <NavLink
                sx={navLinkStyles}
                as="a"  // Use <a> instead of <Link>
                href="/about" // Use href for full reload
                onClick={(e) => {
                  if (window.location.pathname === '/about') {
                    return; // Let the browser do its thing
                  }
                  e.preventDefault(); // Prevent default for other links
                  navigate('/about'); // Use Gatsby's navigate
                }}
          >          
          About us
        </NavLink>
      </Flex>

      {/* Right: Optional placeholder for balance (or additional icons) */}
      <Box sx={{ flex: '0 0 auto' }}>
        <a href='https://www.icompetenatural.com/' target='_blank' rel='noopener noreferrer' sx={{ color: 'logo', textDecoration: 'none', fontWeight: 'bold' }}>
          <img
            src={member_portal}
            alt="Member's Portal"
            sx={{
              width: '17vmin',
              height: 'auto',
              borderRadius: '2vmin',
            }}
          />
        </a>
      </Box>
    </Flex>
  );
};

export default Navbar;