"use client";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/lib/constants";

export default function Skills() {
  return (
    <section className="py-16 bg-background " id="skills">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PROFILE_DATA.skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-card hover:bg-accent transition-colors"
            >
              <p className="text-center font-medium">{skill}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}