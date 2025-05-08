
import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can safely access the theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <Button
        variant="ghost"
        size="icon"
        className="transition-transform hover:scale-110"
        disabled
      >
        <MoonIcon className="h-5 w-5 text-muted" />
        <span className="sr-only">Theme toggle placeholder</span>
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-400 animate-pulse-slow" />
            ) : (
              <MoonIcon className="h-5 w-5 text-blue-500" />
            )}
            <span className="sr-only">{theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
