/** @jsxImportSource theme-ui */
import { Link } from 'gatsby'
import { Flex, NavLink } from 'theme-ui'

const Navbar = () => {
  return (
    <Flex as="nav" sx={{ gap: 4, backgroundColor: "primary" }}>
      <NavLink as={Link} to="/" sx={{ color: 'text', textDecoration: 'none' }}>
        Home
      </NavLink>
      <NavLink as={Link} to="/livestreams" sx={{ color: 'text', textDecoration: 'none' }}>
        Livestreams
      </NavLink>
      <NavLink as={Link} to="/competitions" sx={{ color: 'text', textDecoration: 'none' }}>
        Competitions
      </NavLink>
      <NavLink as={Link} to="/register" sx={{ color: 'text', textDecoration: 'none' }}>
        Register
      </NavLink>
    </Flex>
  )
}

export default Navbar
