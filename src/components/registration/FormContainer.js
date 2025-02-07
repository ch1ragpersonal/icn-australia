// src/components/Registration/FormContainer.js
/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui';

const FormContainer = ({ children }) => (
  <Box
    sx={{
      maxWidth: "400px",
      margin: "0 auto",
      padding: 4,
      backgroundColor: "background",
      borderRadius: "md",
      boxShadow: "md",
    }}
  >
    {children}
  </Box>
);

export default FormContainer;