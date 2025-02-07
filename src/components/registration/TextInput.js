// src/components/Registration/TextInput.js
/** @jsxImportSource theme-ui */
import React from "react";
import { Input, Box, Label } from "theme-ui";

const TextInput = ({ label, name, value, onChange, error, type = "text" }) => (
  <Box sx={{ mb: 3 }}>
    <Label htmlFor={name} sx={{ mb: 1 }}>{label}</Label>
    <Input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-describedby={`${name}-error`}
      sx={{
        borderColor: error ? "error" : "gray", // Highlight border on error
        "&:focus": {
          borderColor: error ? "error" : "primary",
          boxShadow: (theme) => `0 0 0 2px ${error ? theme.colors.error : theme.colors.primary}`,
          outline: "none",
        },
      }}
    />
    {error && (
      <Box sx={{ color: "error", mt: 1 }} id={`${name}-error`}>
        {error}
      </Box>
    )}
  </Box>
);

export default TextInput;