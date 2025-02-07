// src/components/Registration/Button.js
/** @jsxImportSource theme-ui */
import React from "react";
import { Button as ThemeUIButton } from "theme-ui";

const Button = ({ children, ...props }) => (
  <ThemeUIButton {...props} variant="primary">
    {children}
  </ThemeUIButton>
);

export default Button;