'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    if (pathname === '/admin') return (
        <>
            {children}
        </>
    );

    return (
        <div className="flex bg-background min-h-screen text-foreground selection:bg-primary/30">
            {/* Desktop Sidebar - Always visible on lg+ */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <AdminSidebar />
            </div>
            
            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
            
            {/* Mobile Sidebar - Slides in from left with enhanced header */}
            <motion.div 
                initial={false}
                animate={{ 
                    x: mobileMenuOpen ? 0 : '-100%'
                }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-white/10 shadow-2xl"
            >
                {/* Mobile Menu Header with Profile DP */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 bg-surface/80 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-7 rounded-full overflow-hidden border-2 border-primary">
                            <img 
                                src="/rao-shab-new.jpg" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-primary/20 flex items-center justify-center"><span class="text-primary text-xs font-bold">DP</span></div>';
                                }}
                            />
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter">Rao Sahab</span>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg text-foreground/60 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {/* Sidebar Content */}
                <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                    <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
                </div>
            </motion.div>
            
            <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
                {/* Topbar - Visible on all screens */}
                <div className="sticky top-0 z-30 bg-surface border-b border-white/5">
                    <div className="h-16 flex items-center justify-between px-4 lg:px-6">
                        <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-white hidden sm:block">Control Panel</div>
                            <div className="text-sm font-medium text-foreground/60 hidden lg:block">/ {pathname.replace('/admin/', '').charAt(0).toUpperCase() + pathname.replace('/admin/', '').slice(1) || 'Dashboard'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-foreground/60 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-foreground/50">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* <AdminTopbar /> - Removed as per user request */}
                
                {/* Second Navbar - Functional Bottom Navigation */}
                <nav className="border-t border-white/5 bg-surface/50 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-8">
                                <a href="/admin/dashboard" className="text-foreground/60 hover:text-white transition-colors font-medium text-sm">
                                    Dashboard
                                </a>
                                <a href="/admin/projects" className="text-foreground/60 hover:text-white transition-colors font-medium text-sm">
                                    Projects
                                </a>
                                <a href="/admin/messages" className="text-foreground/60 hover:text-white transition-colors font-medium text-sm">
                                    Messages
                                </a>
                            </div>
                            <div className="flex items-center space-x-6">
                                <button className="text-foreground/60 hover:text-white transition-colors text-sm font-medium">
                                    Help
                                </button>
                                <button className="text-foreground/60 hover:text-white transition-colors text-sm font-medium">
                                    Support
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                
                <main className="flex-grow overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8 lg:p-12 bg-[#05060A]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}