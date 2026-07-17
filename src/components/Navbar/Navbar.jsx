import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Code Submission Platform
      </Link>

      <div className={styles.right}>
        <span className={styles.user}>
          Hello, {user?.name} 
        </span>

        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}