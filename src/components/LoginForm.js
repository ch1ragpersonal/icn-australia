/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const LoginForm = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      const extractedUsername = userEmail.split("@")[0];
      onSuccess(extractedUsername);
    } catch (error) {
      toast.error("Invalid email or password. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "background",
        padding: 4,
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
        width: "300px",
      }}
    >
      <h2 sx={{ textAlign: "center", color: "text", fontSize: 4, mb: 3 }}>Login</h2>
      <form onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            padding: 2,
            fontSize: 2,
            border: "1px solid",
            borderColor: "secondary",
            borderRadius: "8px",
            "&:focus": {
              borderColor: "primary",
              outline: "none",
            },
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            padding: 2,
            fontSize: 2,
            border: "1px solid",
            borderColor: "secondary",
            borderRadius: "8px",
            "&:focus": {
              borderColor: "primary",
              outline: "none",
            },
          }}
        />
        <button
          type="submit"
          sx={{
            backgroundColor: "primary",
            color: "background",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: 2,
            "&:hover": {
              backgroundColor: "secondary",
            },
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={onClose}
          sx={{
            backgroundColor: "secondary",
            color: "background",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: 2,
            "&:hover": {
              backgroundColor: "primary",
            },
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
