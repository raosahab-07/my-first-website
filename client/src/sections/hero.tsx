'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Database, Terminal, Brush } from 'lucide-react';
import { Github, Facebook, Twitter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/Avatar';

export function Hero() {
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user?.user_metadata?.avatar_url) {
                    setUserAvatar(user.user_metadata.avatar_url);
                }
            } catch (error) {
                console.error('Failed to fetch user avatar:', error);
            }
        };
        
        fetchUserAvatar();
    }, []);
    
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 md:px-12 py-20">
            {/* Background Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-violet/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-[1400px] w-full grid lg:grid-cols-2 gap-12 md:gap-20 items-center z-10">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-violet opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-violet"></span>
                            </span>
                            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Available for hire</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
                            Building digital <br/>
                            <span className="text-gradient">Experiences.</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                            Senior Full Stack Engineer & UI Designer specializing in scalable web applications with pixel-perfect aesthetics.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                        <button 
                            className="btn-primary group w-full sm:w-auto"
                            onClick={scrollToProjects}
                        >
                            View My Work
                            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                        <button 
                            className="btn-secondary w-full sm:w-auto"
                            onClick={scrollToContact}
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Tech Stack Indicators */}
                    <div className="pt-8 border-t border-white/5">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-4">Core Technologies</p>
                        <div className="flex flex-wrap gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Code size={18} /> React
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Database size={18} /> Node.js
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Terminal size={18} /> TypeScript
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Brush size={18} /> Figma
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Avatar / Visual - Mobile Optimized */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative flex items-center md:justify-end">
                        {/* Mobile Layout: DP + Right-aligned Social Icons */}
                        <div className="flex items-center gap-6 md:hidden">
                            {/* Main Avatar Component */}
                            <div className="flex-shrink-0 relative">
                                <Avatar
                                    src={userAvatar || "/rao-shab-new.jpg"}
                                    alt="Rao Sahab"
                                    size={288}
                                    gradientRing={true}
                                    glow={true}
                                    dynamicColors={true}
                                />
                            </div>
                            
                            {/* Social Icons - Dynamic color hover synced with admin */}
                            <div className="flex flex-col gap-4">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Github size={24} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Facebook size={24} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Twitter size={24} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                            </div>
                        </div>

                        {/* Desktop/Tablet Layout */}
                        <div className="hidden md:block relative">
                            <Avatar
                                src={userAvatar || "/rao-shab-new.jpg"}
                                alt="Rao Sahab"
                                size={450}
                                gradientRing={true}
                                glow={true}
                                dynamicColors={true}
                            />
                            
                            {/* Floating Social Icons - Dynamic color hover synced with admin */}
                            <div className="absolute -right-6 top-1/3 flex flex-col gap-4">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Github size={20} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Facebook size={20} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer group">
                                    <Twitter size={20} className="group-hover:text-[var(--primary)] transition-colors duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
                <ArrowDown size={14} className="text-gray-400" />
            </div>
        </section>
    );
}
