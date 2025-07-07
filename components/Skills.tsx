"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PROFILE_DATA } from "@/lib/constants";
import { useRef } from "react";
import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Brain,
  Wrench,
} from "lucide-react";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["ReactJS", "NextJS", "Redux", "Typescript", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express", "Python", "Prisma"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MongoDB", "PostgresSQL", "Redis","Supabase"],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS Cloud", "Docker", "S3/R2 (Filestorage)","Kubernetes(intermediate)"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Testing & Tools",
      icon: Wrench,
      skills: ["Cypress", "Jest", "Git/GitHub", "Web Scraping"],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Other Technologies",
      icon: Globe,
      skills: ["Web Sockets", "Stripe","Cypress","Websockets"],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
      id="skills"
      ref={containerRef}
    >
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-30, 30]),
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4"
          >
            <Brain className="w-4 h-4" />
            Technical Expertise
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Skills & Technologies
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks that I use
            to build scalable, efficient, and user-friendly applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.title} variants={itemVariants} className="group">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-medium`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* All Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-muted-foreground">
            All Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {PROFILE_DATA.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className="group cursor-default"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-300 shadow-soft hover:shadow-medium"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: "Technologies", value: PROFILE_DATA.skills.length + "+" },
            { label: "Projects", value: PROFILE_DATA.projects.length + "+" },
            { label: "Years Experience", value: (new Date().getFullYear() - new Date("2023-01-01").getFullYear()) + " years" },
            { label: "Happy Clients", value: "10+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}