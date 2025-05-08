
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract hash from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (!accessToken && !refreshToken) {
          // Process normal OAuth callback
          await supabase.auth.getSession();
        }

        // Navigate to dashboard after successful authentication
        navigate('/dashboard');
      } catch (error) {
        console.error('Error processing authentication callback:', error);
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-brand-600" />
      <p className="mt-4 text-lg">Completando l'accesso...</p>
    </div>
  );
};

export default AuthCallback;
