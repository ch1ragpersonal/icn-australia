/** @jsxImportSource theme-ui */
import { Link } from 'gatsby'
import { Flex, NavLink } from 'theme-ui'

const Navbar = () => {
  return (
    <Flex as="nav" sx={{ gap: 4 }}>
      <NavLink as={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
        Home
      </NavLink>
      <NavLink as={Link} to="/test_page" sx={{ color: 'white', textDecoration: 'none' }}>
        Test Page 
      </NavLink>
      <NavLink as={Link} to="/test_page_2" sx={{ color: 'white', textDecoration: 'none' }}>
        Test Page 2
      </NavLink>
      <NavLink as={Link} to="/test-page3" sx={{ color: 'white', textDecoration: 'none' }}>
        Test Page 3
      </NavLink>
    </Flex>
  )
}

export default Navbar
