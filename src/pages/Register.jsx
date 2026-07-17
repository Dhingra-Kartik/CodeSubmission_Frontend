import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authApi";
import useAuth from "../hooks/useAuth";
import styles from "./styles/Login.module.css";

export default function Register() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await register(formData);

      loginUser(data.token, data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Account 🚀</h1>
        <p>Join the Platform and start solving problems.</p>

        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <button
            className={styles.button}
            type="submit"
          >
            Register
          </button>

        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}