
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/Auth/callback";
import Dashboard from "./pages/Dashboard";
import Ideas from "./pages/Ideas";
import NewIdea from "./pages/NewIdea";
import Resources from "./pages/Resources";
import NewResource from "./pages/NewResource";
import ResourceDetail from "./pages/ResourceDetail";
import EditResource from "./pages/EditResource";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import Templates from "./pages/Templates";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Research from "./pages/Research";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="page-transition-enter page-transition-enter-active">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/ideas" element={
                  <ProtectedRoute>
                    <Ideas />
                  </ProtectedRoute>
                } />
                <Route path="/new-idea" element={
                  <ProtectedRoute>
                    <NewIdea />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                } />
                <Route path="/new-resource" element={
                  <ProtectedRoute>
                    <NewResource />
                  </ProtectedRoute>
                } />
                <Route path="/resources/:id" element={
                  <ProtectedRoute>
                    <ResourceDetail />
                  </ProtectedRoute>
                } />
                <Route path="/resources/edit/:id" element={
                  <ProtectedRoute>
                    <EditResource />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                } />
                <Route path="/research" element={
                  <ProtectedRoute>
                    <Research />
                  </ProtectedRoute>
                } />
                
                {/* Public Routes */}
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/support" element={<Support />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
