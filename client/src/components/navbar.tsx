'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { useVisualConfig } from '@/contexts/VisualConfigContext';
import { Avatar } from './Avatar';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Journey', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { config } = useVisualConfig();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus trap
            const focusableElements = menuRef.current?.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            if (focusableElements?.length) {
                (focusableElements[0] as HTMLElement).focus();
            }
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close menu on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    // Resume button now navigates to /resume page
    const goToResume = () => {
        window.location.href = '/resume';
    };

    // Handle menu item click
    const handleMenuItemClick = (href: string) => {
        setIsOpen(false);
        // Smooth scroll to section
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        buttonRef.current?.focus();
    };

    // Close menu when clicking outside
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
            buttonRef.current?.focus();
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-20' : 'h-24'}`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-white font-bold text-xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-violet group-hover:to-accent-pink transition-all">
                        Rao Sahab
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-violet transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Right side Actions */}
                <div className="flex items-center gap-4">
                    {/* Desktop Resume Button - Glassmorphism Style */}
                    <button 
                        onClick={goToResume}
                        className="hidden md:flex group relative items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white text-sm font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-primary/25 hover:scale-105"
                        title="View my professional resume"
                    >
                        <FileText size={16} />
                        <span>Resume</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        ref={buttonRef}
                        className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleOutsideClick}
                    >
                        {/* Backdrop with glassmorphism effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-background/80 via-surface/70 to-background/80 backdrop-blur-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 via-transparent to-accent-pink/10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Mobile Menu - Left Aligned with Close Button */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        className="fixed inset-0 z-50 md:hidden flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Main menu"
                    >
                        {/* Left Menu Panel */}
                        <motion.div
                            className="w-full max-w-sm bg-surface/90 backdrop-blur-3xl border-r border-white/10 shadow-2xl shadow-black/50 h-full p-8 flex flex-col"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                        >
                            {/* Menu Header with Profile DP and Close Button */}
                            <div className="flex items-center justify-between mb-10">
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Avatar
                                        src="/rao-shab-new.jpg"
                                        alt="Profile"
                                        size={40}
                                        gradientRing={false}
                                        glow={false}
                                        dynamicColors={true}
                                    />
                                    <span className="text-lg font-bold text-white">Rao Sahab</span>
                                </motion.div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex-1 space-y-3 overflow-y-auto">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className="block w-full py-4 px-5 rounded-xl text-lg font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent focus:bg-white/5"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMenuItemClick(link.href);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index + 0.2 }}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="flex items-center justify-between">
                                            {link.name}
                                            <motion.span
                                                className="text-primary text-lg"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index + 0.4 }}
                                            >
                                                –
                                            </motion.span>
                                        </span>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Resume Button */}
                            <motion.div
                                className="pt-6 border-t border-white/10 mt-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.button
                                    onClick={() => {
                                        goToResume();
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-accent-violet/20 to-accent-pink/20 border border-primary/30 text-white font-semibold flex items-center justify-center gap-3 hover:from-accent-violet/30 hover:to-accent-pink/30 hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FileText size={20} />
                                    View Resume
                                    <ArrowUpRight size={20} />
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Click outside to close */}
                        <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
