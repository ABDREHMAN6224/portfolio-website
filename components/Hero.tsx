"use client";
import { motion } from "framer-motion";
import { GithubIcon, Linkedin, Mail, Phone, Download, ArrowDown } from "lucide-react";
import { PROFILE_DATA } from "@/lib/constants";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  const { profile } = PROFILE_DATA;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const socialLinks = [
    { icon: GithubIcon, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    { icon: Phone, href: `tel:${profile.phone}`, label: "Phone" }
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = `/updated_cv.pdf`;
    link.download = `${profile.name}_Resume.pdf`;
    link.style.display = 'none';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container-custom section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            className="relative mx-auto mb-8 group"
          >
            <div className="relative w-48 h-48 mx-auto">
              {/* Gradient Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 group-hover:animate-pulse">
                <div className="w-full h-full bg-background rounded-full p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={`/${profile.avatar}`}
                      alt={profile.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                  </div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-gradient"
              >
                {profile.name}
              </motion.h1>
              
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Full Stack Developer
                </span>
                <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-large transition-all duration-300 hover:scale-105"
                onClick={downloadResume}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-primary/20 hover:border-primary/40 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <a href="#projects">
                  <span>View My Work</span>
                  <ArrowDown className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 pt-8"
            >
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative p-4 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
                    aria-label={item.label}
                  >
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {item.label}
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}