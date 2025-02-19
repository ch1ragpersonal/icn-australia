/** @jsxImportSource theme-ui */
import React from "react";
import { Link } from "gatsby";
import { Button } from "theme-ui";

const SecondaryButton = ({ text, to }) => {
  const button = (
    <Button
    sx={{
        mt: 3,
        background: "whiteBack",
        color: "buttontext",
        fontSize: "16px",
        borderRadius: "8px",
        border: '2px solid #004225',
        px: 4,
        py: 2,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "buttonback",
        },
      }}
    >
      {text}
    </Button>
  );

  if (to) {
    return (
      <Link to={to} sx={{ textDecoration: "none" }}>
        {button}
      </Link>
    );
  }

  return button;
};

export default SecondaryButton;
