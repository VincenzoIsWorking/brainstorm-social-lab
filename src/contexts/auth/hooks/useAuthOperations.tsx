
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState } from "../authUtils";

export const useAuthOperations = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Signing in user:", email);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt to sign out globally before signing in
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

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
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

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
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
      
      console.log("Google OAuth initiated successfully:", data);
      return data;

    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      toast({
        title: "Errore di accesso con Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      console.log("Signing out user");
      
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) throw error;

      console.log("Sign out successful");
      
      toast({
        title: "Logout effettuato",
        description: "Hai effettuato il logout con successo",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast({
        title: "Errore durante il logout",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    isLoading
  };
};
