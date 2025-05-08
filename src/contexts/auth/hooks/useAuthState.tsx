
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProfile } from "../authUtils";

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("useAuthState: Initializing auth state");
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state changed:", event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // Defer profile fetching to avoid Supabase auth deadlocks
      if (currentSession?.user) {
        setTimeout(() => {
          fetchUserProfile(currentSession.user.id).then(data => {
            setProfile(data);
          });
        }, 0);
      } else {
        setProfile(null);
      }
    });

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        console.log("useAuthState: Checking for existing session");
        
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("useAuthState: Session check result:", !!initialSession);
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          const profileData = await fetchUserProfile(initialSession.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user,
    profile,
    isLoading,
    isAuthenticated: !!user
  };
};
