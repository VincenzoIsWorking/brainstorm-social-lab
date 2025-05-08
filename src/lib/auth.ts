
import { supabase } from "@/integrations/supabase/client";

/**
 * Thoroughly cleans up auth state in localStorage and sessionStorage
 * to prevent authentication limbo states
 */
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

/**
 * Fetches a user's profile from the profiles table
 */
export const fetchUserProfile = async (userId: string) => {
  try {
    console.log("Fetching profile for user ID:", userId);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    console.log("Profile data received:", data);
    return data;
  } catch (error: any) {
    console.error("Unexpected error fetching profile:", error.message);
    return null;
  }
};

/**
 * Attempts global sign out and cleans up auth state
 */
export const performSignOut = async () => {
  // Clean up auth state
  cleanupAuthState();
  
  // Attempt global sign out
  try {
    await supabase.auth.signOut({ scope: "global" });
    console.log("Global sign out completed");
  } catch (err) {
    console.error("Error during sign out:", err);
    // Continue even if this fails
  }
  
  // Force full page reload for clean state
  window.location.href = '/';
};
