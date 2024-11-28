import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}