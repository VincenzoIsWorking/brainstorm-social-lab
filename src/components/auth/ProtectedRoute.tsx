
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("ProtectedRoute check:", { isAuthenticated, isLoading });

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
    return <Navigate to="/auth" replace />;
  }

  // Render children if authenticated
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
