import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "../styles/toastStyles.css";
import { Box } from "theme-ui"; // Ensure Theme UI components are available

const LoginForm = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Ensure this component only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isClient) return; // Prevent execution during SSR

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      const extractedUsername = userEmail.split("@")[0];
      onSuccess(extractedUsername);
    } catch (error) {
      toast.error("Invalid email or password.", { className: "toast-error" });
    }
  };

  if (!isClient) return null; // Don't render during SSR

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "background",
        padding: 4,
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
        width: "320px",
      }}
    >
      <h2 sx={{ textAlign: "center", color: "text", fontSize: 4, mb: 3 }}>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
      </form>
    </Box>
  );
};

export default LoginForm;
