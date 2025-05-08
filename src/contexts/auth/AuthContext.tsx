
import React, { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";

// Define authentication state and operations
export interface AuthContextProps {
  // Authentication state
  session: Session | null;
  user: User | null;
  profile: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  
  // Authentication operations
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  
  // State reset
  clearAuthError: () => void;
}

// Create the context with undefined default
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * Hook to use authentication context
 * Throws error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    console.error("useAuth è stato chiamato fuori da un AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
