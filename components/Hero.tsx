"use client";
import { motion } from "framer-motion";
import { GithubIcon, Linkedin, Mail, Phone } from "lucide-react";
import { PROFILE_DATA } from "@/lib/constants";
import Image from "next/image";

export default function Hero() {
  const { profile } = PROFILE_DATA;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent">
      <div className="container px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-primary"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
              priority
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-slate-500 dark:from-primary dark:to-accent bg-clip-text text-transparent"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-center"
          >
            {profile.summary}
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            className="flex justify-center gap-4 mb-8"
          >
            {[
              { icon: GithubIcon, href: profile.github },
              { icon: Linkedin, href: profile.linkedin },
              { icon: Mail, href: `mailto:${profile.email}` },
              { icon: Phone, href: `tel:${profile.phone}` }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}