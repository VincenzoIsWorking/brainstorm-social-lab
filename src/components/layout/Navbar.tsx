
import React from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, User, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { isAuthenticated, user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();
    }
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-6 w-6 text-brand-600" />
          <Link to="/" className="text-xl font-heading font-bold">
            SocialLab
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/ideas" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Le mie idee
          </Link>
          <Link to="/resources" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Risorse
          </Link>
        </nav>
        
        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {profile?.username ? `@${profile.username}` : user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" /> Profilo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild className="hidden md:inline-flex">
                <Link to="/auth">Accedi</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Inizia Gratis</Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-white dark:bg-gray-950 border-t">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/ideas" 
              className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Le mie idee
            </Link>
            <Link 
              to="/resources" 
              className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Risorse
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/auth" 
                className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accedi / Registrati
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
