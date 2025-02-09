/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Text, Grid, Link } from "theme-ui";
import { format } from 'date-fns';

const RecentResults = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCompetitionResults(sort: { date: DESC }, limit: 2) {
        nodes {
          competitionName
          results {
            results
          }
          date
        }
      }
    }
  `);

  const recentResults = data.allContentfulCompetitionResults.nodes;

  return (
    <Box>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb: 2 }}>Recent Results</Heading>
      <Grid columns={[1, 2]} gap={2}>
        {recentResults.map((result, index) => (
          <Box key={index} sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            // REMOVE THESE:
            // border: '1px solid',
            // borderColor: 'gray.200',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Keep the shadow!
            bg: 'white',
          }}>
            <Heading as="h3" sx={{ fontSize: '16px', mb: 1, textAlign: 'center' }}>{result.competitionName}</Heading>
            <Text sx={{ fontSize: '12px', color: 'gray.600', mb: 1, textAlign: 'center', fontWeight: 'bold' }}>
              {result.date ? format(new Date(result.date), "MMMM dd, yyyy") : "Date Not Available"}
            </Text>
            <Text sx={{
                fontSize: '12px',
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                flexGrow: 1,
                textAlign: 'center'
              }}>{result.results.results}</Text>
          </Box>
        ))}
      </Grid>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link href="/results" sx={{
            display: 'inline-block',
            px: 3,
            py: 1,
            bg: 'primary',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            '&:hover': {
              bg: 'secondary',
            }
        }}>
          See More Results
        </Link>
       </Box>
    </Box>
  );
};

export default RecentResults;