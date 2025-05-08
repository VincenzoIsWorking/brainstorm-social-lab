
import React from "react";
import { AuthContext } from "./AuthContext";
import { useAuth as useAuthHook } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use our unified auth hook for both state and operations
  const auth = useAuthHook();
  
  console.log("AuthProvider rendering with auth state:", {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    hasUser: !!auth.user
  });
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
