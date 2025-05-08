
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth";
import LoginForm, { LoginFormValues } from "@/components/auth/LoginForm";
import RegisterForm, { RegisterFormValues } from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, signInWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(values.email, values.password);
      // Navigation will be handled by the useEffect above when isAuthenticated changes
    } catch (error: any) {
      setError(error.message || "Errore durante il login");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    console.log("Register form submitted with values:", values);
    setIsLoading(true);
    setError(null);
    try {
      const userData = {
        full_name: values.fullName,
        username: values.username,
      };
      
      await signUp(values.email, values.password, userData);
      // Switch to login view after successful registration
      setIsLogin(true);
    } catch (error: any) {
      setError(error.message || "Errore durante la registrazione");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      console.log("Initiating Google sign in from Auth.tsx");
      await signInWithGoogle();
      // Redirect will happen automatically by Supabase
    } catch (error: any) {
      setError(error.message || "Errore durante l'accesso con Google");
      setGoogleLoading(false);
    }
  };

  // Console log per debugging
  console.log("Auth component rendered. isAuthenticated:", isAuthenticated);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <LightbulbIcon className="h-10 w-10 text-brand-600" />
            <span className="text-2xl font-heading font-bold">SocialLab</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Accedi al tuo account" : "Crea un nuovo account"}
        </h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SocialLogin 
          onGoogleSignIn={handleGoogleSignIn}
          googleLoading={googleLoading}
        />

        {isLogin ? (
          <LoginForm
            onSubmit={onLoginSubmit}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm
            onSubmit={onRegisterSubmit}
            isLoading={isLoading}
          />
        )}

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading || googleLoading}
          >
            {isLogin
              ? "Non hai un account? Registrati"
              : "Hai già un account? Accedi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
