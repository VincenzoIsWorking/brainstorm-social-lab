
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState } from "../authUtils";

export const useAuthOperations = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt to sign out globally before signing in
      try {
        await supabase.auth.signOut({ scope: "global" });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login riuscito",
        description: "Benvenuto su SocialLab",
      });

    } catch (error: any) {
      console.error("Error signing in:", error.message);
      toast({
        title: "Errore di accesso",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
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

      toast({
        title: "Registrazione completata",
        description: "Controlla la tua email per confermare la registrazione",
      });

    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast({
        title: "Errore di registrazione",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();

      console.log("Starting Google OAuth sign-in...");
      
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

    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      toast({
        title: "Errore di accesso con Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) throw error;

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
    }
  };

  return {
    signIn,
    signUp,
    signInWithGoogle,
    signOut
  };
};
