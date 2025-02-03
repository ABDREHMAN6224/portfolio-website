"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          {"<ARM/>"}
        </motion.a>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}