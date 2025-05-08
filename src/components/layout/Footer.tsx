
import React from "react";
import { LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-md dark:bg-gray-950/80 transition-all duration-300">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <LightbulbIcon className="h-6 w-6 text-brand-600" />
              <span className="text-xl font-heading font-bold gradient-text">SocialLab</span>
            </div>
            <p className="text-sm text-muted-foreground transition-colors duration-300">
              La piattaforma per generare idee brillanti per i tuoi social media.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Prodotto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/features" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Funzionalità
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Prezzi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Risorse</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/blog" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Guide
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Template
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Contatti</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/support" className="hover:text-brand-600 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Supporto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground transition-colors duration-300">
            &copy; {new Date().getFullYear()} SocialLab. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-brand-600 transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-brand-600 transition-colors duration-300">
              Termini
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
