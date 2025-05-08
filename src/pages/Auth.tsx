import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LightbulbIcon, Loader2, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth";
import { Separator } from "@/components/ui/separator";

// Define form schema for login
const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "Password deve essere di almeno 6 caratteri"),
});

// Define form schema for registration
const registerSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z
    .string()
    .min(6, "Password deve essere di almeno 6 caratteri"),
  confirmPassword: z.string(),
  fullName: z.string().min(2, "Nome completo richiesto"),
  username: z.string().min(3, "Username deve essere di almeno 3 caratteri"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non corrispondono",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

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

  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Register form setup with explicit default values to fix input issues
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      username: "",
    },
    mode: "onChange",
  });
  
  // Add debugging log to monitor form state changes for registration
  console.log("Register form state:", registerForm.formState);

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

        {/* Social Login Options */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>Continua con Google</span>
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
              Oppure continua con
            </span>
          </div>
        </div>

        {isLogin ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Il tuo indirizzo email"
                          autoComplete="email"
                          disabled={isLoading}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="La tua password"
                          autoComplete="current-password"
                          disabled={isLoading}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accesso in corso...
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Il tuo nome completo"
                        disabled={isLoading}
                        {...field}
                        onChange={(e) => {
                          console.log("fullName changed:", e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username unico"
                        disabled={isLoading}
                        {...field}
                        onChange={(e) => {
                          console.log("username changed:", e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Il tuo indirizzo email"
                          autoComplete="email"
                          disabled={isLoading}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Crea una password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conferma password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Conferma la tua password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrazione in corso...
                  </>
                ) : (
                  "Registrati"
                )}
              </Button>
            </form>
          </Form>
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
