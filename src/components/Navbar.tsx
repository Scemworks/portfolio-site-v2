
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-6", 
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl flex items-center justify-between">
        <a href="#" className="text-lg font-medium text-white">
          moncy.dev
        </a>
        
        <div className="hidden md:block">
          <a href="mailto:connect@moncy.dev" className="text-sm text-white/80 hover:text-white transition-colors">
            connect@moncy.dev
          </a>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <a 
                href="#about"
                className="text-sm text-white hover:text-white/70 transition-colors font-medium"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#work"
                className="text-sm text-white hover:text-white/70 transition-colors font-medium"
              >
                WORK
              </a>
            </li>
            <li>
              <a 
                href="#contact"
                className="text-sm text-white hover:text-white/70 transition-colors font-medium"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
