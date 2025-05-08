
import { Loader2 } from 'lucide-react';
import { useAuthCallback } from '@/hooks/useAuthCallback';

const AuthCallback = () => {
  const { isProcessing } = useAuthCallback();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-brand-600" />
      <p className="mt-4 text-lg">Completando l'accesso...</p>
    </div>
  );
};

export default AuthCallback;
