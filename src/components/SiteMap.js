/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";
import { Box, Heading, Flex } from "theme-ui";

const SiteLink = ({ to, children }) => {
  const isExternal = to.startsWith("http");

  return isExternal ? (
    <a href={to} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 2, color: "logo", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} sx={{ fontSize: 2, color: "logo", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
      {children}
    </GatsbyLink>
  );
};

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

  // Filter out unwanted pages
  const pages = data.allSitePage.nodes
    .map((page) => page.path)
    .filter((path) => !path.includes("404") && path !== "/");

  // Split pages into two roughly equal columns
  const midIndex = Math.ceil(pages.length / 2);
  const column1 = pages.slice(0, midIndex);
  const column2 = pages.slice(midIndex);

  return (
    <Box as="footer" sx={{ backgroundColor: "muted", p: 4, textAlign: "center" }}>
      <Flex sx={{ justifyContent: "center", gap: [3, 5], flexWrap: "wrap" }}>
        {/* Column 1 */}
        <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
            Column 1
          </Heading>
          {column1.map((path) => (
            <SiteLink key={path} to={path} sx={{ mb: 2 }}>
              {path === "/" ? "Home" : path.replace(/-/g, " ").replace(/\//g, "").toUpperCase()}
            </SiteLink>
          ))}
        </Box>

        {/* Column 2 */}
        <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
            Column 2
          </Heading>
          {column2.map((path) => (
            <SiteLink key={path} to={path} sx={{ mb: 2 }}>
              {path === "/" ? "Home" : path.replace(/-/g, " ").replace(/\//g, "").toUpperCase()}
            </SiteLink>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteMap;
