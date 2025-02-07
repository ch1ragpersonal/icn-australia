import { Box } from "theme-ui";
import { FaUserCircle } from "react-icons/fa";

const LoginButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "transparent", // Ensure no background
        padding: 0, // No extra padding
        margin: 0, // No margin offset
        overflow: "hidden", // Prevent rendering issues
      }}
      onClick={onClick}
    >
      <FaUserCircle
        size={40}
        style={{
          backgroundColor: "primary", // Force no background
          padding: 0, // No extra padding
          margin: 0, // No unwanted margin
          display: "block", // Prevent unwanted extra spacing
          color: "#AB7823"
        }}
      />
    </Box>
  );
};

export default LoginButton;