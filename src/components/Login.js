/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;
      const extractedUsername = userEmail.split("@")[0];
      setUsername(extractedUsername);
      setIsLoggedIn(true);
      setShowModal(false);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    setUsername("");
    alert("Logged out successfully!");
  };

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background",
        padding: 2
      }}
    >
      {isLoggedIn ? (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: 3,
            backgroundColor: "secondary",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <FaUserCircle size={40} sx={{ color: "logo" }} />
          <span
            sx={{
              fontSize: 3,
              fontWeight: "bold",
              color: "text",
            }}
          >
            {username}
          </span>
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
      ) : (
        <>
          <FaUserCircle
            size={40}
            sx={{
              color: "primary",
              cursor: "pointer",
              display: "inline-block",
              height: "40px",
              width: "40px",
            }}
            onClick={() => setShowModal(true)}
          />
          {showModal && (
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
              <h2
                sx={{
                  textAlign: "center",
                  color: "text",
                  fontSize: 4,
                  mb: 3,
                }}
              >
                Login
              </h2>
              <form
                onSubmit={handleLogin}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
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
                  onClick={() => setShowModal(false)}
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
          )}
        </>
      )}
    </div>
  );
};

export default Login;
