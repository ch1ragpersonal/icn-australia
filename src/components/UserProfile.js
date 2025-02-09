import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const UserProfile = ({ username, onLogout }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    if (isClient) {
      auth.signOut().then(() => {
        onLogout();
        toast.success("Logged out successfully");
      }).catch(error => {
        toast.error("Logout failed");
      });
    }
  };

  return isClient ? (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: 2,
        backgroundColor: "secondary",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <FaUserCircle size={40} sx={{ color: "logo" }} />
      <span sx={{ fontSize: 3, fontWeight: "bold", color: "text" }}>{username}</span>
      <button
        sx={{
          backgroundColor: "primary",
          color: "background",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: 2,
          "&:hover": {
            backgroundColor: "secondary",
            color: "background",
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : null; // Render nothing during SSR
};

export default UserProfile;
