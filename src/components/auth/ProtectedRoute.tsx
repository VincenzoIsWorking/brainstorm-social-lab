
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext"; // Corretto il percorso di importazione

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Migliorato il logging per debugging
  useEffect(() => {
    console.log("ProtectedRoute debug:", {
      path: location.pathname,
      isAuthenticated,
      isLoading,
      userEmail: user?.email || "nessun utente",
      timestamp: new Date().toISOString()
    });
  }, [location.pathname, isAuthenticated, isLoading, user]);

  // Show loading state while checking authentication
  if (isLoading) {
    console.log("Auth is loading, showing spinner");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to /auth");
    // Save the current location for redirecting back after login
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
