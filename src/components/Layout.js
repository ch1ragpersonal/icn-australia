/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui'

const Layout = ({ children }) => (
  <Box>
    <header sx={{ bg: 'primary', color: 'green', padding: '1rem' }}>
      <Container>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <h1>Header is here!</h1>
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