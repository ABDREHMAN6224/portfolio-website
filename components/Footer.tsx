"use client";

import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/lib/constants";
import { GithubIcon, Linkedin, Mail, Phone, Heart, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
	const { profile } = PROFILE_DATA;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const socialLinks = [
		{ icon: GithubIcon, href: profile.github, label: "GitHub" },
		{ icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
		{ icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
		{ icon: Phone, href: `tel:${profile.phone}`, label: "Phone" },
	];

	const quickLinks = [
		{ name: "Home", href: "#" },
		{ name: "About", href: "#education" },
		{ name: "Experience", href: "#experience" },
		{ name: "Skills", href: "#skills" },
		{ name: "Projects", href: "#projects" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50">
			</div>

			<div className="container-custom relative z-10">
				{/* Main Footer Content */}
				<div className="py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Brand Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="lg:col-span-2 space-y-4"
						>
							<div className="flex items-center gap-3">
								<span className="text-2xl font-bold font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{"<ARM/>"}
								</span>
							</div>

							<p className="text-muted-foreground leading-relaxed max-w-md">
								Full Stack Developer passionate about creating innovative solutions
								and building scalable applications with modern technologies.
							</p>

							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>Made with</span>
								<Heart className="w-4 h-4 text-red-500 fill-current" />
								<span>using Next.js & Tailwind CSS</span>
							</div>
						</motion.div>

						{/* Quick Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="space-y-4"
						>
							<h3 className="font-semibold text-lg">Quick Links</h3>
							<ul className="space-y-2">
								{quickLinks.map((link) => (
									<li key={link.name}>
										<motion.a
											href={link.href}
											whileHover={{ x: 5 }}
											className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center group"
										>
											<span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
											{link.name}
										</motion.a>
									</li>
								))}
							</ul>
						</motion.div>

						{/* Contact Info */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="space-y-4"
						>
							<h3 className="font-semibold text-lg">Get in Touch</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
										<Mail className="w-4 h-4 text-white" />
									</div>
									<span className="break-all">{profile.email}</span>
								</div>
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
										<Phone className="w-4 h-4 text-white" />
									</div>
									<span>{profile.phone}</span>
								</div>
							</div>

							{/* Social Links */}
							<div className="pt-2">
								<p className="text-sm font-medium mb-3">Follow Me</p>
								<div className="flex gap-3">
									{socialLinks.map((social, index) => {
										const Icon = social.icon;
										return (
											<motion.a
												key={social.label}
												href={social.href}
												target={
													social.href.startsWith("http")
														? "_blank"
														: undefined
												}
												rel={
													social.href.startsWith("http")
														? "noopener noreferrer"
														: undefined
												}
												whileHover={{ scale: 1.1, y: -2 }}
												whileTap={{ scale: 0.9 }}
												className="w-10 h-10 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group"
												aria-label={social.label}
											>
												<Icon className="w-5 h-5" />
											</motion.a>
										);
									})}
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-border/50 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="text-sm text-muted-foreground text-center md:text-left"
						>
							© {new Date().getFullYear()} Abdul Rehman Memon. All rights reserved.
							<span className="hidden sm:inline">
								{" "}
								• Crafted with passion and precision.
							</span>
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="flex items-center gap-4"
						>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span>Available for work</span>
							</div>

							<Button
								variant="outline"
								size="sm"
								onClick={scrollToTop}
								className="group border-border/50 hover:border-primary/30 hover:bg-primary/5"
							>
								<ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
								<span className="sr-only">Back to top</span>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</footer>
	);
}