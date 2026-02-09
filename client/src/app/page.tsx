'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Experience } from "@/sections/experience";
import { Contact } from "@/sections/contact";
import { Footer } from "@/components/footer";
import { useVisualConfig } from '@/contexts/VisualConfigContext';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { config, isLoading, applyConfigGlobally } = useVisualConfig();

  // Apply visual configuration to public website
  useEffect(() => {
    if (!isLoading && config) {
      applyConfigGlobally(config);
    }
  }, [config, isLoading, applyConfigGlobally]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      
      {/* Global Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 size-14 rounded-full bg-primary hover:bg-accent-violet text-white shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
      </motion.button>
    </main>
  );
}
