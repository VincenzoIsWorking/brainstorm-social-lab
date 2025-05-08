
import React from "react";
import { AuthContext } from "./AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthOperations } from "./hooks/useAuthOperations";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { session, user, profile, isLoading, isAuthenticated } = useAuthState();
  const { signIn, signUp, signInWithGoogle, signOut } = useAuthOperations();

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
