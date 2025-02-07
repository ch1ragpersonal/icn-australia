/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Login from '../components/Login';  // Import the Login component
import Seo from '../components/seo'
import Layout from '../components/Layout'

export default function RulesPage() {
  return (
    <>
      <Seo title="Rules and Regulations" description="Rules and Regulations" />

          <Heading sx={{ color: 'background' }}>Welcome to My Site</Heading>
          <div>
            <h1>
                Rules and Regulations
            </h1>
          </div>

        

    </>
  );
}