/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    toast.success(`Welcome back, ${username}!`, { autoClose: 3000 });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    toast.info("Logged out successfully", { autoClose: 3000 });
  };

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "background",
        minHeight: isLoggedIn ? "auto" : "100vh",
        padding: 3,
      }}
    >
      <ToastContainer position="top-right" />
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
