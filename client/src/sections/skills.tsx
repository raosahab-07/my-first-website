'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillService } from '@/services/api';
import { Zap, Cpu, Code2, Layers } from 'lucide-react';

export function Skills() {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await skillService.getAll();
                setSkills(data || []);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-16 items-start">
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                                <Cpu size={12} />
                                <span>Technical Engine</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                                Core <span className="text-gradient">Stack.</span>
                            </h2>
                        </div>
                        
                        <p className="text-lg text-foreground/40 font-medium leading-relaxed">
                            Engineering high-performance digital solutions with a focus on scalability, security, and elite user experiences.
                        </p>

                        <div className="p-8 bg-surface border border-white/5 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                            <Layers className="text-primary mb-4" size={24} />
                            <h4 className="text-lg font-bold text-white mb-2">Architectural Integrity</h4>
                            <p className="text-sm text-foreground/40 font-medium leading-relaxed">
                                Every line of code is architected with precision, ensuring a seamless bridge between technical complexity and aesthetic simplicity.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-24 rounded-2xl bg-surface border border-white/5 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.id || skill.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-6 bg-surface border border-white/5 rounded-2xl group hover:border-primary/20 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                                                    <Zap size={16} />
                                                </div>
                                                <span className="font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                                                    {skill.name}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
                                                LEVEL {skill.level}%
                                            </span>
                                        </div>
                                        
                                        <div className="h-1 w-full bg-white/[0.02] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-primary shadow-glow-primary"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Summary Stats - Sigma Reference */}
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {[
                                { label: 'Projects Built', value: '40+', icon: Layers },
                                { label: 'Uptime Score', value: '99.9%', icon: Cpu },
                                { label: 'Success Rate', value: '100%', icon: Code2 }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-surface/50 backdrop-blur-md">
                                    <stat.icon size={16} className="text-foreground/20 mb-3" />
                                    <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
