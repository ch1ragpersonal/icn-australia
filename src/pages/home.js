/** @jsxImportSource theme-ui */
import * as React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { Container, Heading, Text, Box } from 'theme-ui'

const HomePage = () => {
  return (
    <>
      <Seo 
        title="Home"
        description="Welcome to ICN Australia"
      />
      <Container>
        <Box sx={{ py: 5 }}>
          <Heading as="h1" sx={{ fontSize: 5, mb: 4 }}>
            Welcome to ICN Australia
          </Heading>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
