import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(""); // Store the extracted username

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;
      const extractedUsername = userEmail.split("@")[0]; // Extract part before @
      setUsername(extractedUsername); // Store the username
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
    <div>
      {isLoggedIn ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={30} />
          <span>{username}</span> {/* Display username */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <FaUserCircle
            size={30}
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          />
          {showModal && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;