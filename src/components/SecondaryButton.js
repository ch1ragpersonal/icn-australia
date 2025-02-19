/** @jsxImportSource theme-ui */
import React from "react";
import { Link } from "gatsby";
import { Button } from "theme-ui";

const SecondaryButton = ({ text, to }) => {
  // This function opens external links or PDFs in a new tab.
  const handleClick = () => {
    if (to) {
      window.open(to, "_blank", "noopener,noreferrer");
    }
  };

  // Create the styled button.
  const button = (
    <Button
      sx={{
        mt: 3,
        background: "whiteBack",
        color: "buttontext",
        fontSize: "16px",
        borderRadius: "8px",
        border: "2px solid #004225",
        px: 4,
        py: 2,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "buttonback",
        },
      }}
      // If the URL is external (or a PDF), assign the onClick handler.
      onClick={
        to && (to.startsWith("http") || to.endsWith(".pdf"))
          ? handleClick
          : undefined
      }
    >
      {text}
    </Button>
  );

  // For internal links, wrap the button in a Gatsby Link.
  if (to && !to.startsWith("http") && !to.endsWith(".pdf")) {
    return (
      <Link to={to} sx={{ textDecoration: "none" }}>
        {button}
      </Link>
    );
  }

  // For external links/PDFs or if no "to" is provided, just return the button.
  return button;
};

export default SecondaryButton;
