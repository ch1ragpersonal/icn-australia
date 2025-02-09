/** @jsxImportSource theme-ui */
import { Link } from 'gatsby';
import { Flex, NavLink, Box } from 'theme-ui';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const Dropdown = ({ title, links, defaultTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <NavLink
        as={Link}
        to={defaultTo}
        sx={{ color: 'logo', textDecoration: 'none', cursor: 'pointer' }}
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
              minWidth: '200px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              zIndex: 1000,
              borderRadius: '0 0 4px 4px',
              display: 'block',
            }}
          >
            {links.map(({ to, label }) => (
              <NavLink
              key={to}
              as="button"
              onClick={() => (window.location.href = to)}
              sx={{
                color: 'logo',
                textDecoration: 'none',
                display: 'block',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                width: '100%',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'secondary' },
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

const Navbar = () => {
  return (
    <Flex as="nav" sx={{ gap: 4, backgroundColor: 'primary' }}>
      <img
        src="/logo.png"
        alt="Logo"
        sx={{
          width: '30px',
          height: 'auto',
          borderRadius: '8px',
        }}
      />

      <NavLink as={Link} to="/" sx={{ color: 'logo', textDecoration: 'none' }}>
        Home
      </NavLink>

      <Dropdown
        title="Livestreams"
        defaultTo="/livestreams"
        links={[
          { to: '/livestreams?upcoming=true', label: 'Upcoming Events' },
          { to: '/livestreams?complete=true', label: 'Past Events' },
        ]}
      />

      <Dropdown
        title="Competitions"
        defaultTo="/competitions"
        links={[
          { to: '/competitions', label: 'By State' },
          { to: '/competitions?view=schedule', label: 'Schedule' },
          { to: '/competitions/results', label: 'Results' },
          { to: '/competitions/rules', label: 'Rules' },
        ]}
      />

      <NavLink as={Link} to="/register" sx={{ color: 'logo', textDecoration: 'none' }}>
        Register
      </NavLink>
      <NavLink as={Link} to="/rules_and_regulations" sx={{ color: 'logo', textDecoration: 'none' }}>
        Rules and Regulations
      </NavLink>
    </Flex>
  );
};

export default Navbar;
