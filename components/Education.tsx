"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE_DATA } from "@/lib/constants";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { education } = PROFILE_DATA;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="education"
      ref={containerRef}
    >
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
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
            <GraduationCap className="w-4 h-4" />
            Academic Background
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Education
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a strong foundation in computer science and software
            engineering at one of Pakistan's premier institutions.
          </p>
        </motion.div>

        {/* Education Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-500">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* University Logo/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Education Details */}
                  <div className="flex-1 space-y-6">
                    {/* Degree & Institution */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
                        {education.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg font-medium">
                          {education.institution}
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* CGPA */}
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Current CGPA
                          </div>
                          <div className="text-2xl font-bold text-gradient">
                            {education.cgpa}
                          </div>
                        </div>
                      </div>

                      {/* Graduation */}
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Expected Graduation
                          </div>
                          <div className="text-2xl font-bold text-gradient">
                            {education.expected_graduation}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-primary border-0 px-4 py-2"
                      >
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Computer Sciences
                      </Badge>

                    
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </Card>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-muted-foreground">
            Academic Highlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "High Distinction",
                description: "3.92 CGPA consistently maintained",
                icon: Award,
                color: "from-yellow-500 to-orange-500",
              },
              {
                title: "Porject Focused",
                description: "AI/ML and Full-Stack Development",
                icon: GraduationCap,
                color: "from-blue-500 to-indigo-500",
              },
              {
                title: "Expected Graduate",
                description: "Class of 2026",
                icon: Calendar,
                color: "from-emerald-500 to-teal-500",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 group cursor-default"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}