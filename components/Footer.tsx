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
				<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 md:py-14 lg:py-16 xl:py-20">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
						{/* Brand Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="sm:col-span-2 md:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-5 text-center sm:text-left"
						>
							<div className="flex items-center justify-center sm:justify-start gap-3">
								<span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{"<ARM/>"}
								</span>
							</div>

							<p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto sm:mx-0">
								Full Stack Developer passionate about creating innovative solutions
								and building scalable applications with modern technologies.
							</p>

							
						</motion.div>

						{/* Quick Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="space-y-3 sm:space-y-4 md:space-y-5 text-center sm:text-left md:text-left"
						>
							<h3 className="font-semibold text-base sm:text-lg md:text-lg lg:text-xl">Quick Links</h3>
							<ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
								{quickLinks.map((link) => (
									<li key={link.name}>
										<motion.a
											href={link.href}
											whileHover={{ x: 5 }}
											className="text-sm sm:text-sm md:text-base text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center sm:justify-start md:justify-start group"
										>
											<span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2 hidden sm:block md:block"></span>
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
							className="space-y-3 sm:space-y-4 md:space-y-5 text-center sm:text-left md:text-left"
						>
							<h3 className="font-semibold text-base sm:text-lg md:text-lg lg:text-xl">Get in Touch</h3>
							<div className="space-y-2 sm:space-y-3 md:space-y-3">
								<div className="flex items-center justify-center sm:justify-start md:justify-start gap-3 text-xs sm:text-sm md:text-base text-muted-foreground">
									<div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
										<Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white" />
									</div>
									<span className="break-all text-left">{profile.email}</span>
								</div>
								<div className="flex items-center justify-center sm:justify-start md:justify-start gap-3 text-xs sm:text-sm md:text-base text-muted-foreground">
									<div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
										<Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white" />
									</div>
									<span>{profile.phone}</span>
								</div>
							</div>

							{/* Social Links */}
							<div className="pt-2 md:pt-3">
								<p className="text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 md:mb-4">Follow Me</p>
								<div className="flex gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start md:justify-start">
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
												className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group"
												aria-label={social.label}
											>
												<Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
											</motion.a>
										);
									})}
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-border/50 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-8">
					<div className="flex flex-col sm:flex-row md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6">
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="text-xs sm:text-sm md:text-sm lg:text-base text-muted-foreground text-center sm:text-left md:text-left order-2 sm:order-1 md:order-1"
						>
							© {new Date().getFullYear()} Abdul Rehman Memon. All rights reserved.
							<span className="hidden md:inline lg:inline">
								{" "}
								• Crafted with passion and precision.
							</span>
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="flex flex-col xs:flex-row sm:flex-row md:flex-row items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 order-1 sm:order-2 md:order-2"
						>
							<div className="flex items-center gap-2 text-xs sm:text-sm md:text-sm lg:text-base text-muted-foreground">
								<div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
								<span className="whitespace-nowrap">Available for work</span>
							</div>

							<Button
								variant="outline"
								size="sm"
								onClick={scrollToTop}
								className="group border-border/50 hover:border-primary/30 hover:bg-primary/5 text-xs sm:text-sm md:text-sm lg:text-base h-8 sm:h-9 md:h-10 lg:h-11 px-3 sm:px-4 md:px-5 lg:px-6"
							>
								<ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
								<span className="sr-only">Back to top</span>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</footer>
	);
}