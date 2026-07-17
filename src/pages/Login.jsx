import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authApi";
import useAuth from "../hooks/useAuth";
import styles from "./styles/Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
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
      const data = await login(formData);

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

        <h1>Welcome Back 👋</h1>
        <p>Login to continue solving problems.</p>

        <form onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>

        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}