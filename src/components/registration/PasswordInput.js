// src/components/Registration/PasswordInput.js
/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { Input, Box, Label, IconButton } from "theme-ui";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ label, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{ mb: 3 }}>
    <Label htmlFor={name} sx={{ mb: 1 }}>{label}</Label>
    <Box sx={{ position: 'relative' }}>
      <Input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={`${name}-error`}
        sx={{
            borderColor: error ? "error" : "gray",
            pr: 10, // Make space for the icon
            "&:focus": {
              borderColor: error ? "error" : "primary",
              boxShadow: (theme) => `0 0 0 2px ${error ? theme.colors.error : theme.colors.primary}`,
              outline: "none",
            },
        }}
      />
        <IconButton
            sx={{
                position: 'absolute',
                right: 2,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                bg: 'transparent',
                border: 'none',
                p: 1,
            }}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            >
            {showPassword ? <FiEyeOff /> : <FiEye />}
        </IconButton>
    </Box>
      {error && (
        <Box sx={{ color: "error", mt: 1 }} id={`${name}-error`}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default PasswordInput;