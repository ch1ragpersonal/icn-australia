/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleLoginSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "background",
        minHeight: isLoggedIn ? "auto" : "100vh", // Fixes excessive white space
        padding: 3, // Adds padding for better alignment
      }}
    >
      {isLoggedIn ? (
        <UserProfile username={username} onLogout={handleLogout} />
      ) : (
        <>
          <LoginButton onClick={() => setShowModal(true)} />
          {showModal && (
            <LoginForm onSuccess={handleLoginSuccess} onClose={() => setShowModal(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default Login;
