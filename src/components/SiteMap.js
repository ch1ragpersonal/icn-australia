/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { Box, Heading } from "theme-ui";

const SiteMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage {
        nodes {
          path
        }
      }
    }
  `);

  // Filter out unwanted pages like dynamic ones or hidden routes
  const pages = data.allSitePage.nodes
    .map((page) => page.path)
    .filter((path) => !path.includes("404") && path !== "/"); // Exclude 404 and homepage if needed

  return (
    <Box as="footer" sx={{ backgroundColor: "muted", p: 4, textAlign: "center" }}>
      <Heading as="h3" sx={{ fontSize: 3, mb: 3 }}>
        Site Map
      </Heading>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {pages.map((path) => (
          <Link key={path} to={path} sx={{ fontSize: 2, mb: 2, color: "primary" }}>
            {path === "/" ? "Home" : path.replace(/-/g, " ").replace(/\//g, "").toUpperCase()}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SiteMap;
