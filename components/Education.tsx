"use client";

import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const { education } = PROFILE_DATA;

  return (
    <section className="py-16 bg-accent" id="education">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Education
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-bold">{education.degree}</h3>
                    <p className="text-muted-foreground">{education.institution}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p className="font-semibold">{education.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Graduation</p>
                    <p className="font-semibold">{education.expected_graduation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}