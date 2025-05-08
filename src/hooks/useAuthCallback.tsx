
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useAuthCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback processing started...");
        
        // Extract hash from the URL if present
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const errorParam = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (errorParam) {
          console.error("OAuth error:", errorParam, errorDescription);
          throw new Error(errorDescription || "Errore durante l'autenticazione");
        }

        console.log("Processing tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });

        // Process normal OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session retrieval error:", error);
          throw error;
        }
        
        console.log("Auth callback successful, session retrieved:", !!data.session);

        // Navigate to dashboard after successful authentication
        navigate('/dashboard');
      } catch (error: any) {
        console.error("Error processing authentication callback:", error);
        toast({
          title: "Errore di autenticazione",
          description: error.message || "Si è verificato un errore durante l'autenticazione",
          variant: "destructive",
        });
        navigate('/auth');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return { isProcessing };
};
