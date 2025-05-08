
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
