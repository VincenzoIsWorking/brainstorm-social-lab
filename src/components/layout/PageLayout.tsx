
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      <main className="flex-1 mt-16 transition-all duration-300">
        <div className="gradient-bg fixed inset-0 -z-10 opacity-10 animate-gradientShift"></div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
