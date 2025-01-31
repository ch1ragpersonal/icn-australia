/** @jsxImportSource theme-ui */
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const LoginButton = ({ onClick }) => {
  return (
    <FaUserCircle
      size={40}
      sx={{
        color: "primary",
        cursor: "pointer",
        display: "inline-block",
        height: "auto",
      }}
      onClick={onClick}
    />
  );
};

export default LoginButton;