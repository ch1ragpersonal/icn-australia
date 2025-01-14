/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui'
import Login from '../components/Login'
import Navbar from './navbar'
import Seo from './seo'

const Layout = ({ children, title, description }) => (
  <Box>
    <Seo 
      title={title}
      description={description || "ICN Australia - Australia's Leading Natural Bodybuilding Competition"}
    />
    <header sx={{ bg: 'primary', color: 'white', padding: '1rem' }}>
      <Container>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Navbar />
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