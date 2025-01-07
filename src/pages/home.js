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
        description="Welcome to ICN Australia - Your trusted partner in industrial capability"
      />
      <Container>
        <Box sx={{ py: 5 }}>
          <Heading as="h1" sx={{ fontSize: 5, mb: 4 }}>
            Welcome to ICN Australia
          </Heading>
          <Text sx={{ fontSize: 3, mb: 4 }}>
            Connecting Australian industry with project opportunities
          </Text>
          <Text sx={{ fontSize: 2, color: 'gray.7' }}>
            ICN Australia helps Australian and New Zealand companies maximise opportunities to 
            participate in major projects. We introduce local suppliers to projects large and small.
          </Text>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
