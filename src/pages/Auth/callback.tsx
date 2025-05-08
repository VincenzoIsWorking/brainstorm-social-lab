
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback processing started...");
        
        // Extract hash from the URL if present (for some OAuth providers)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const errorParam = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (errorParam) {
          console.error("OAuth error from URL hash:", errorParam, errorDescription);
          throw new Error(errorDescription || "Errore durante l'autenticazione");
        }

        // Process normal OAuth callback via Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session retrieval error:", error);
          throw error;
        }
        
        console.log("Auth callback successful, session retrieved:", {
          hasSession: !!data.session,
          userEmail: data.session?.user?.email
        });

        // Navigate to dashboard after successful authentication
        navigate('/dashboard', { replace: true });
      } catch (error: any) {
        console.error("Error processing authentication callback:", error);
        toast({
          title: "Errore di autenticazione",
          description: error.message || "Si è verificato un errore durante l'autenticazione",
          variant: "destructive",
        });
        navigate('/auth', { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-brand-600" />
      <p className="mt-4 text-lg">Completando l'accesso...</p>
      {isProcessing && (
        <p className="mt-2 text-sm text-muted-foreground">
          Attendere prego, stiamo elaborando l'autenticazione...
        </p>
      )}
    </div>
  );
};

export default AuthCallback;
