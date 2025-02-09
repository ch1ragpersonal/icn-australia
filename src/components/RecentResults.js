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
    <Box sx={{ mb: 4 }}>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb:3 }}>Recent Results</Heading>
      <Grid columns={[1, 2]} gap={3}>
        {recentResults.map((result, index) => (
          <Box key={index} sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: 'md',
            boxShadow: 'sm',
            bg: 'white'
          }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 1 }}>{result.competitionName}</Heading>
            <Text sx={{ fontSize: 1, color: 'gray.600', mb: 2 }}>
              {result.date ? format(new Date(result.date), "MMMM dd, yyyy") : "Date Not Available"}
            </Text>
            <Text sx={{
                fontSize: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3, /* Number of lines to show */
                WebkitBoxOrient: "vertical",
              }}>{result.results.results}</Text>
          </Box>
        ))}
      </Grid>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/results" sx={{
            display: 'inline-block',
            px: 4,
            py: 2,
            bg: 'primary',
            color: 'white',
            borderRadius: 'md',
            textDecoration: 'none',
            fontWeight: 'bold',
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