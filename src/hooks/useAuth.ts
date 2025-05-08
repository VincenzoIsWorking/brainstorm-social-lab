
import { useEffect, useState, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState, fetchUserProfile, performSignOut } from "@/lib/auth";
import { useToast } from "./use-toast";

export function useAuth() {
  // Authentication state
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  // Clear any auth errors
  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Load user profile data
  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const profileData = await fetchUserProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error("Error in profile loading:", error);
    }
  }, []);

  // Initialize authentication state and set up listeners
  useEffect(() => {
    console.log("Initializing authentication state...");
    let mounted = true;

    // Set up the auth state listener first (important for correct order)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log(`Auth state change event: ${event}`, currentSession?.user?.email);
        
        if (!mounted) return;

        // Update session and user state immediately
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle profile loading with a slight delay to prevent Supabase deadlocks
        if (currentSession?.user) {
          // Use setTimeout to avoid potential auth deadlocks
          setTimeout(() => {
            if (mounted) {
              loadUserProfile(currentSession.user.id);
            }
          }, 10);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    // Then check for an existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        console.log("Checking for existing session...");
        
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session check result:", !!initialSession, initialSession?.user?.email);
        
        if (!mounted) return;
        
        // Set initial auth state
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Load profile if user exists
        if (initialSession?.user) {
          await loadUserProfile(initialSession.user.id);
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setAuthError(error.message || "Failed to initialize authentication");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Start initialization
    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up auth subscription");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      clearAuthError();
      console.log("Signing in user:", email);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Try to sign out globally before signing in to prevent conflicts
      try {
        await supabase.auth.signOut({ scope: "global" });
      } catch (err) {
        // Continue even if this fails
        console.log("Pre-signin signout had an error (continuing anyway):", err);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful for:", email);
      
      toast({
        title: "Login riuscito",
        description: "Benvenuto su SocialLab",
      });

      return data;
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setAuthError(error.message || "Failed to sign in");
      toast({
        title: "Errore di accesso",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      clearAuthError();
      console.log("Signing up user:", email);
      
      // Clean up auth state first
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;

      console.log("Sign up successful for:", email);
      
      toast({
        title: "Registrazione completata",
        description: "Controlla la tua email per confermare la registrazione",
      });

      return data;
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setAuthError(error.message || "Failed to sign up");
      toast({
        title: "Errore di registrazione",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      clearAuthError();
      console.log("Starting Google OAuth sign-in...");
      
      // Clean up auth state first
      cleanupAuthState();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'email profile',
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        throw error;
      }
      
      console.log("Google OAuth initiated successfully");
      return data;
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      setAuthError(error.message || "Failed to sign in with Google");
      toast({
        title: "Errore di accesso con Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      clearAuthError();
      console.log("Signing out user");
      
      await performSignOut();
      
      toast({
        title: "Logout effettuato",
        description: "Hai effettuato il logout con successo",
      });
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      setAuthError(error.message || "Failed to sign out");
      toast({
        title: "Errore durante il logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Debug information
  console.log("Auth state:", {
    isAuthenticated: !!user,
    isLoading,
    hasSession: !!session,
    userEmail: user?.email || "none",
    hasProfile: !!profile
  });

  return {
    // State
    session,
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    authError,
    
    // Operations
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    
    // Utilities
    clearAuthError,
  };
}
