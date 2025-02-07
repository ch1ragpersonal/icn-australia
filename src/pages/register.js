// src/pages/register.js
/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Add ToastContainer here
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextInput from "../components/registration/TextInput";
import PasswordInput from "../components/registration/PasswordInput";
import Button from "../components/registration/Button"; 
import FormContainer from "../components/registration/FormContainer";  // Import from the components folder
import { Box } from "theme-ui";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
        toast.success(`Account created for ${formData.username}!`, { className: "toast-success" });
      console.log("Registered user:", user);

        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });


    } catch (error) {
      console.error("Registration error:", error);
        if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already in use.", { className: "toast-error" });
        }
       else {
        toast.error(error.message, { className: "toast-error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <FormContainer>
        <h2 sx={{ textAlign: "center", mb: 3 }}>Register</h2>
        <form onSubmit={handleSubmit}>
            <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            />
            <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            />
            <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            />
            <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            />
            <Button type="submit" disabled={loading} sx={{ width: "100%" }}>
            {loading ? "Registering..." : "Register"}
            </Button>
        </form>
        </FormContainer>
        <ToastContainer position="top-right" />
        </div>
  );
};

export default RegisterPage;