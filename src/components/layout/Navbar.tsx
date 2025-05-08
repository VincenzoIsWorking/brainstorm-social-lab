
import React from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-6 w-6 text-brand-600" />
          <Link to="/" className="text-xl font-heading font-bold">
            SocialLab
          </Link>
        </div>
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
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Accedi
          </Button>
          <Button>Inizia Gratis</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
