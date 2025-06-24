"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { toast } from "@/hooks/use-toast";
import { PROFILE_DATA } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  GithubIcon,
  Linkedin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData(e.target as HTMLFormElement);
    formDataObj.append("access_key", "a44d55e3-1e15-497a-aff6-a146edd03880");
    formDataObj.append("subject", `Contact from ${formDataObj.get("name")}`);
    formDataObj.append("from", formDataObj.get("email") as string);
    formDataObj.append("text", formDataObj.get("message") as string);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out! I'll get back to you within 24 hours.",
        });
        (e.target as HTMLFormElement).reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again later or contact me directly.",
        variant: "destructive",
      });
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: PROFILE_DATA.profile.email,
      href: `mailto:${PROFILE_DATA.profile.email}`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: PROFILE_DATA.profile.phone,
      href: `tel:${PROFILE_DATA.profile.phone}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: GithubIcon,
      title: "GitHub",
      value: "View Profile",
      href: PROFILE_DATA.profile.github,
      color: "from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect",
      href: PROFILE_DATA.profile.linkedin,
      color: "from-blue-600 to-blue-800",
    },
  ];

  return (
    <section
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
      id="contact"
      ref={containerRef}
    >
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
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
            <MessageCircle className="w-4 h-4" />
            Let&apos;s Connect
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Get in Touch
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from
            you. Let&apos;s discuss how we can work together to bring your ideas to
            life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I&apos;m always open to discussing new opportunities, innovative
                projects, or just having a chat about technology and development.
                Choose your preferred way to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-primary transition-colors duration-300">
                        {method.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Currently Available
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">
                    Open for new opportunities
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Freelance Projects
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Full-time Roles
                </Badge>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-500">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Send a Message</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I&apos;ll get back to you as soon as
                    possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Name *
                      </label>
                      <Input
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Response Time Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-primary/10">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">
              I typically respond within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
