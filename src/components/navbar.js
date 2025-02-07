/** @jsxImportSource theme-ui */

import { Link } from 'gatsby'
import { Flex, NavLink, Box } from 'theme-ui'
import React from 'react'

const Navbar = () => {
  return (
    <Flex as="nav" sx={{ gap: 4, backgroundColor: "primary" }}>
      
      <img 
        src="/icon.png"
        alt="Logo" 
        sx={{
          width: '30px', // Set the width
          height: 'auto', // Maintain aspect ratio
          borderRadius: '8px', // Optional: add rounded corners
        }} 
      />

      <NavLink as={Link} to="/" sx={{ color: 'logo', textDecoration: 'none' }}>
        Home
      </NavLink>

      {/* Dropdown for Livestreams */}
      <Box
        sx={{
          position: 'relative',
          '&:hover > div': { display: 'block' },
        }}
      >
        <NavLink 
          as={Link} 
          to="/livestreams" 
          sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Livestreams
        </NavLink>
        <Box
          sx={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'primary',
            minWidth: '200px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            zIndex: 1000,
            borderRadius: '0 0 4px 4px',
          }}
        >
          <NavLink as={Link} to="/livestreams/upcoming" sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: 'secondary',
            }
          }}>
            Upcoming Events
          </NavLink>
          <NavLink as={Link} to="/livestreams/past" sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: 'secondary',
            }
          }}>
            Past Events
          </NavLink>
        </Box>
      </Box>

      {/* Dropdown for Competitions */}
      <Box
        sx={{
          position: 'relative',
          '&:hover > div': { display: 'block' },
        }}
      >
        <NavLink 
          as={Link} 
          to="/competitions" 
          sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Competitions
        </NavLink>
        <Box
          sx={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'primary',
            minWidth: '200px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            zIndex: 1000,
            borderRadius: '0 0 4px 4px',
          }}
        >
          <NavLink as={Link} to="/competitions/schedule" sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: 'secondary',
            }
          }}>
            Schedule
          </NavLink>
          <NavLink as={Link} to="/competitions/results" sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: 'secondary',
            }
          }}>
            Results
          </NavLink>
          <NavLink as={Link} to="/competitions/rules" sx={{ 
            color: 'logo', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: 'secondary',
            }
          }}>
            Rules
          </NavLink>
        </Box>
      </Box>

      <NavLink as={Link} to="/register" sx={{ color: 'logo', textDecoration: 'none' }}>
        Register
      </NavLink>
    </Flex>
  )
}

export default Navbar
