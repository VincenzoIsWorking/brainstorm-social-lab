
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, isAuthenticated, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page we should redirect to after login (if any)
  const from = location.state?.from || "/dashboard";

  // Clear any auth errors when switching between login/signup
  useEffect(() => {
    clearAuthError();
  }, [isLogin, clearAuthError]);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await signIn(values.email, values.password);
      // Navigation will be handled by the useEffect above when isAuthenticated changes
    } catch (error: any) {
      console.error("Login error handled in form:", error);
      // Error is already handled in the auth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    console.log("Register form submitted with values:", values);
    setIsSubmitting(true);
    try {
      const userData = {
        full_name: values.fullName,
        username: values.username,
      };
      
      await signUp(values.email, values.password, userData);
      // Switch to login view after successful registration
      setIsLogin(true);
    } catch (error: any) {
      console.error("Registration error handled in form:", error);
      // Error is already handled in the auth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      console.log("Initiating Google sign in from Auth.tsx");
      await signInWithGoogle();
      // Redirect will happen automatically by Supabase
    } catch (error: any) {
      console.error("Google sign in error handled in form:", error);
      // Error is already handled in the auth hook
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

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <SocialLogin 
          onGoogleSignIn={handleGoogleSignIn}
          googleLoading={googleLoading}
        />

        {isLogin ? (
          <LoginForm
            onSubmit={onLoginSubmit}
            isLoading={isSubmitting}
          />
        ) : (
          <RegisterForm
            onSubmit={onRegisterSubmit}
            isLoading={isSubmitting}
          />
        )}

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              clearAuthError();
            }}
            disabled={isSubmitting || googleLoading}
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
