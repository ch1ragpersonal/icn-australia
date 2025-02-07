/** @jsxImportSource theme-ui */

import { Link } from 'gatsby'
import { Flex, NavLink } from 'theme-ui'

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
      <NavLink as={Link} to="/livestreams" sx={{ color: 'logo', textDecoration: 'none' }}>
        Livestreams
      </NavLink>
      <NavLink as={Link} to="/competitions" sx={{ color: 'logo', textDecoration: 'none' }}>
        Competitions
      </NavLink>
      <NavLink as={Link} to="/register" sx={{ color: 'logo', textDecoration: 'none' }}>
        Register
      </NavLink>
    </Flex>
  )
}

export default Navbar
