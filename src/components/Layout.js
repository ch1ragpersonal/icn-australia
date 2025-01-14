/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui'
import Login from '../components/Login'
import Navbar from './navbar'  // Import the Navbar component

const Layout = ({ children }) => (
  <Box>
    <header sx={{ bg: 'primary', color: 'text', padding: '1rem' }}>
      <Container>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Navbar />  {/* Add the Navbar component */}
          <Login />
        </Flex>
      </Container>
    </header>
    <main>{children}</main>
    <footer sx={{ bg: 'muted', padding: '1rem', textAlign: 'center' }}>
      © 2024 My Gatsby Site
    </footer>
  </Box>
)

export default Layout