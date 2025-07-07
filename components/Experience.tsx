"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE_DATA } from "@/lib/constants";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Calendar, ChevronRight, Briefcase } from "lucide-react";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      className="section-padding relative overflow-hidden bg-gradient-to-b from-muted/30 to-background"
      id="experience"
      ref={containerRef}
    >
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-l from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
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
            <Briefcase className="w-4 h-4" />
            Career Journey
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Professional Experience
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through various roles, from intern to full-stack engineer,
            building expertise across modern web technologies and AI/ML.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-px"></div>

          {PROFILE_DATA.experience.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-2 md:-translate-x-2 z-10 shadow-medium">
                <div className="absolute inset-1 bg-background rounded-full"></div>
              </div>

              {/* Content Card */}
              <div
                className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden group">
                    {/* Card Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Building2 className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>

                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-primary border-0 shrink-0"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.duration}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardContent className="pt-0 pb-6">
                      <ul className="space-y-3">
                        {exp.description.map((desc, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          >
                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{desc}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Card>
                </motion.div>
              </div>

              {/* Date Badge for Desktop */}
              <div
                className={`hidden md:block absolute top-4 ${
                  index % 2 === 0 ? "right-4" : "left-4"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-medium"
                >
                  {exp.duration.split(" - ")[0]}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-primary/10">
            <div className="text-3xl md:text-4xl font-bold text-gradient">
              {new Date().getFullYear() - new Date("2023-01-01").getFullYear()}+
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">
                Years of Experience
              </div>
              <div className="text-sm text-muted-foreground">
                Building scalable applications
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}