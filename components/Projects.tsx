"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE_DATA } from "@/lib/constants";
import { Github, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="section-padding relative overflow-hidden" id="projects" ref={containerRef}>
      {/* Background Elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
            <Star className="w-4 h-4" />
            Featured Work
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            My Projects
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, 
            from web applications to AI/ML implementations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {PROFILE_DATA.projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
            >
              <Card className="relative h-full overflow-hidden bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.thumbnail.startsWith('http') ? project.thumbnail : `/${project.thumbnail}`}
                    alt={project.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.links.github && (
                      <Button
                        size="sm"
                        variant="secondary"
                        asChild
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    
                    {project.links.live && (
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                      >
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Project Number */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Project Title & Links */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>
                    
                    <div className="flex gap-2">
                      {project.links.github && (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                      
                      {project.links.live && (
                        <motion.a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description || "A comprehensive full-stack application showcasing modern web development practices and technologies."}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-primary border-0 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                    
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-muted-foreground">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </Card>
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
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-large transition-all duration-300 hover:scale-105"
          >
            <a href={PROFILE_DATA.profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}