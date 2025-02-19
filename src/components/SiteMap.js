/** @jsxImportSource theme-ui */
import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Heading, Flex } from "theme-ui";

// Column 1 Links
const column1Links = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Membership", url: "/register" },
  { title: "Competitions", url: "/competition" },
  { title: "Contact", url: "/contact" }
];

// Column 2 Links
const column2Links = [
  { title: "Polices", url: "/" },
  { title: "By-laws", url: "/" }, // External
  { title: "Licensing", url: "/" } // External
];

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
  return (
    <Box as="footer" sx={{ backgroundColor: "muted", p: 4, textAlign: "center" }}>
      <Flex sx={{ justifyContent: "center", gap: [3, 5], flexWrap: "wrap" }}>
        {/* Column 1 */}
        <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
            Quicklinks
          </Heading>
          {column1Links.map(({ title, url }) => (
            <SiteLink key={url} to={url}>
              {title}
            </SiteLink>
          ))}
        </Box>

        {/* Column 2 */}
        <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
            Legal
          </Heading>
          {column2Links.map(({ title, url }) => (
            <SiteLink key={url} to={url}>
              {title}
            </SiteLink>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteMap;
