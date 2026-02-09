'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useVisualConfig } from '@/contexts/VisualConfigContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { config, isLoading } = useVisualConfig();

    // Apply visual config on mount
    useEffect(() => {
        if (!isLoading && config) {
            // Apply accent color
            document.documentElement.style.setProperty('--primary', config.accentColor);
            document.documentElement.style.setProperty('--color-primary', config.accentColor);
            document.documentElement.style.setProperty('--color-accent-violet', config.accentColor);
            
            // Generate complementary colors
            const r = parseInt(config.accentColor.slice(1, 3), 16);
            const g = parseInt(config.accentColor.slice(3, 5), 16);
            const b = parseInt(config.accentColor.slice(5, 7), 16);
            
            const pinkColor = `rgb(${Math.min(255, r + 30)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`;
            document.documentElement.style.setProperty('--color-accent-pink', pinkColor);
            document.documentElement.style.setProperty('--accent-pink', pinkColor);
            
            // Apply UI mode
            document.documentElement.setAttribute('data-ui-mode', config.uiMode);
        }
    }, [config, isLoading]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-10 md:p-12 rounded-[2.5rem] border-white/5 bg-card/40 backdrop-blur-3xl">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary p-[2px] rounded-3xl mx-auto mb-6">
                            <div className="w-full h-full bg-background rounded-[22px] flex items-center justify-center">
                                <Lock className="text-primary" size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold font-serif tracking-tighter text-foreground mb-2">
                            {config?.brandText || 'Welcome Buddy'}
                        </h1>
                        <p className="text-foreground/40 text-sm font-light">Secure access for the digital architect</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-light"
                                    placeholder="Enter secondary email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Access Token</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-light"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full btn-primary h-16 text-lg tracking-wide group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Secure Access</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-foreground/20 text-xs font-light">
                    Protected by Enterprise Encryption & AI Verification
                </p>
            </motion.div>
        </div>
    );
}
