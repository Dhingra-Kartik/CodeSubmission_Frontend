import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";

import useAuth from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  console.log(user);

  return (
    <BrowserRouter>
  <Routes>

    {/* Public Routes */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />

    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />

    {/* Protected Routes */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route
      path="/problems/:id"
      element={
        <ProtectedRoute>
          <Problem />
        </ProtectedRoute>
      }
    />

  </Routes>
</BrowserRouter>
  );
}

export default App;