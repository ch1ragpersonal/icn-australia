/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Image, Grid } from "theme-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Seo from '../components/seo';
const RegistrationPage = () => {
  const data = useStaticQuery(graphql`
    query {
      longText: allContentfulLongText(filter: { title: { eq: "Registration" } }) {
        nodes {
          title
          content {
            raw
          }
        }
      }
      image: allContentfulAsset(filter: { title: { eq: "rego" } }) {
        nodes {
          file {
            url
          }
          description
        }
      }
    }
  `);

  const textNode = data.longText.nodes[0];
  const imageNode = data.image.nodes[0];

  return (
    <>
      <Seo title={textNode?.title || "Registration"} />
      <Box sx={{ p: 4 }}>
        <Grid columns={[1, 2, "2fr 1fr"]} gap={4}>
          {/* Left Side - Rich Text Content */}
          <Box>
            <Heading as="h1" sx={{ mb: 3 }}>{textNode?.title || "Registration"}</Heading>
            <Box sx={{
              '& h1': { fontSize: 5 },
              '& h2': { fontSize: 4 },
              '& p': { fontSize: 2, lineHeight: 'body' }
            }}>
              {textNode ? documentToReactComponents(JSON.parse(textNode.content.raw)) : <p>No registration content found.</p>}
            </Box>
          </Box>

          {/* Right Side - Image */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {imageNode ? (
              <Image src={imageNode.file.url} alt={imageNode.description || "Registration Image"} sx={{ maxWidth: "100%", height: "auto", borderRadius: 4 }} />
            ) : (
              <p>No image found.</p>
            )}
          </Box>


        </Grid>
      </Box>
    </>
  );
};

export default RegistrationPage;
