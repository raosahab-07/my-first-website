'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code, Link as LinkIcon, AtSign, Code2 } from 'lucide-react';
import { useVisualConfig } from '@/contexts/VisualConfigContext';

export function Footer() {
    const { config } = useVisualConfig();
    
    return (
        <footer className="w-full border-t border-white/5 bg-[#0F1115] pt-12 pb-8 relative overflow-hidden">
            {/* Sigma 3 Exact Redesign */}
            <div className="max-w-[1024px] mx-auto px-6 flex flex-col gap-8 relative z-10">
                
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-2 md:items-start items-center">
                        <div className="flex items-center gap-2 text-white mb-2">
                            <div className="size-6 text-primary">
                                <Code2 size={24} />
                            </div>
                            <span className="font-bold text-lg">{config.brandText}</span>
                        </div>
                        <div className="text-gray-400 text-xs flex flex-col gap-1 md:items-start items-center">
                            <p>raushanyadav2028.r@gmail.com</p>
                            <p>+91 95766 89637</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-8">
                        <a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</a>
                        <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Work</a>
                        <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</a>
                        <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact</a>
                    </div>

                    {/* Social Links - Exact Sigma 3 Layout */}
                    <div className="flex gap-4">
                        <a 
                            href="#" 
                            className="size-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"
                        >
                            <Code size={20} />
                        </a>
                        <a 
                            href="#" 
                            className="size-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"
                        >
                            <LinkIcon size={20} />
                        </a>
                        <a 
                            href="#" 
                            className="size-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"
                        >
                            <AtSign size={20} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/5" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2024 Rao Sahab. All Rights Reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
            
            {/* Ambient background glow for footer (Sigma 1 style) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-t from-accent-violet/5 to-transparent pointer-events-none" />
        </footer>
    );
}
