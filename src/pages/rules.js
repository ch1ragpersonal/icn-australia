/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading } from "theme-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Seo from '../components/seo';

const RulesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulLongText(filter: { title: { eq: "Rules" } }) {
        nodes {
          title
          content {
            raw
          }
        }
      }
    }
  `);

  // Handle the case where no matching content is found.
  if (!data.allContentfulLongText.nodes || data.allContentfulLongText.nodes.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Heading as="h1">Rules</Heading>
        <p>No rules and regulations found.</p>
      </Box>
    );
  }

  const { title, content } = data.allContentfulLongText.nodes[0];

  return (
    <>
    <Seo title={title} />
    <Box sx={{ p: 4 }}>
      <Heading as="h1" sx={{ mb: 4 }}>{title}</Heading>
      <Box sx={{
        '& h1': { fontSize: 5, }, // Example: Style h1 inside the rich text
        '& h2': { fontSize: 4, }, // Example: style h2 inside the rich text
        '& p':  { fontSize: 1, lineHeight: 'body' } // Example: Style paragraphs
      }}>
        {documentToReactComponents(JSON.parse(content.raw))}
      </Box>
    </Box>
    </>
  );
};

export default RulesPage;