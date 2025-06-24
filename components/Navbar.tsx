"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-lg border-b shadow-medium' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom px-4 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {"<ARM/>"}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="relative overflow-hidden group px-4 py-2 rounded-full hover:bg-primary/10 transition-all duration-300"
                >
                  <a href={item.href} className="relative z-10">
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </Button>
              </motion.div>
            ))}
            
            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle />
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2 shadow-medium transition-all duration-300 hover:scale-105"
              >
                Hire Me
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg"></div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-16 right-0 bottom-0 w-64 bg-background/95 backdrop-blur-lg border-l z-40 md:hidden"
      >
        <div className="flex flex-col p-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                x: isMobileMenuOpen ? 0 : 20 
              }}
              transition={{ delay: index * 0.1 }}
              className="group relative py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              <span className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                {item.name}
              </span>
              <div className="absolute bottom-0 left-4 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-8 transition-all duration-300"></div>
            </motion.a>
          ))}
          
          <div className="pt-4 border-t">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full py-3 shadow-medium transition-all duration-300"
              onClick={closeMenu}
            >
              Hire Me
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}