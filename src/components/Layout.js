/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui'
import Login from '../components/Login';  // Import the Login component

const Layout = ({ children }) => (
  <Box>
    <header sx={{ bg: 'primary', color: 'white', padding: '1rem' }}>
      <Container>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <h1>Header is here!</h1>
          {/* Render the Login component below the heading */}
      <Box sx={{ marginTop: 4 }}>
        <Login />
      </Box>
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