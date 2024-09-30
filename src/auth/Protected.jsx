import { Navigate } from "react-router-dom";

// Simulating an authentication check (you can replace this with real logic)
const isAuthenticated = () => {
  // Example: Check localStorage or cookie for token
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
