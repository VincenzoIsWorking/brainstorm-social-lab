
import React from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, User, LogOut, Menu, Calendar, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import ThemeToggle from "@/components/theme/ThemeToggle";
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
  const location = useLocation();

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

  // Navigation links
  const publicLinks = [
    { to: "/features", label: "Funzionalità" },
    { to: "/pricing", label: "Prezzi" },
    { to: "/blog", label: "Blog" },
    { to: "/guides", label: "Guide" },
    { to: "/templates", label: "Template" },
    { to: "/faq", label: "FAQ" },
    { to: "/support", label: "Supporto" },
  ];
  
  const privateLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/ideas", label: "Le mie idee" },
    { to: "/resources", label: "Risorse" },
    { to: "/calendar", label: "Calendario" },
    { to: "/research", label: "Ricerca" },
  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur-md dark:bg-gray-950/80 transition-all duration-300 fixed-header">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-6 w-6 text-brand-600" />
          <Link to="/" className="text-xl font-heading font-bold gradient-text">
            SocialLab
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              {privateLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === link.to 
                      ? "text-brand-600" 
                      : "hover:text-brand-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          ) : (
            <>
              {publicLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === link.to 
                      ? "text-brand-600" 
                      : "hover:text-brand-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>
        
        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-110 transition-transform">
                  <Avatar className="border-2 border-accent">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
                    <AvatarFallback className="bg-brand-500 text-white">{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-panel">
                <DropdownMenuLabel>
                  {profile?.username ? `@${profile.username}` : user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full transition-colors duration-200 hover:bg-accent/50">
                    <User className="mr-2 h-4 w-4" /> Profilo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/calendar" className="cursor-pointer w-full transition-colors duration-200 hover:bg-accent/50">
                    <Calendar className="mr-2 h-4 w-4" /> Calendario
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/research" className="cursor-pointer w-full transition-colors duration-200 hover:bg-accent/50">
                    <Search className="mr-2 h-4 w-4" /> Ricerca
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="transition-colors duration-200 hover:bg-destructive/20">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild className="hidden md:inline-flex transition-transform hover:scale-105">
                <Link to="/auth">Accedi</Link>
              </Button>
              <Button asChild className="transition-transform hover:scale-105">
                <Link to="/auth">Inizia Gratis</Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-background/95 dark:bg-gray-950/95 backdrop-blur-md border-t transition-all duration-300">
          <nav className="flex flex-col space-y-3">
            {isAuthenticated ? (
              // Private links for logged-in users
              privateLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-accent/50 dark:hover:bg-gray-800/50 rounded-md transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              // Public links for visitors
              <>
                {publicLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-accent/50 dark:hover:bg-gray-800/50 rounded-md transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link 
                  to="/auth" 
                  className="px-4 py-2 text-sm font-medium hover:text-brand-600 hover:bg-accent/50 dark:hover:bg-gray-800/50 rounded-md transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accedi / Registrati
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
