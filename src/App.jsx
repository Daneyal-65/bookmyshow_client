import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MovieBookingApp from "./BookMyShowApp";
import LoginSignup from "./auth/LoginSinup";
import ProtectedRoute from "./auth/Protected";
import { useEffect, useState } from "react";

// Simulate a login check by looking for a token in localStorage
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginSignup />} />

        {/* Protected route for the movie booking app */}
        <Route
          path="/book-movie"
          element={
            <ProtectedRoute>
              <MovieBookingApp />
            </ProtectedRoute>
          }
        />

        {/* Redirect to /login if not authenticated */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/book-movie" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
