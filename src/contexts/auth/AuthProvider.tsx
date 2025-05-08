
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
  
  // Make sure all properties defined in AuthContextProps are passed to the provider
  return (
    <AuthContext.Provider value={{
      session: auth.session,
      user: auth.user,
      profile: auth.profile,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      authError: auth.authError,
      signIn: auth.signIn,
      signUp: auth.signUp,
      signInWithGoogle: auth.signInWithGoogle,
      signOut: auth.signOut,
      refreshProfile: auth.refreshProfile,
      clearAuthError: auth.clearAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};
